// LMS Modular Router & App Controller
import { Home } from './pages/home.js';
import { Courses } from './pages/courses.js';
import { Mission } from './pages/mission.js';

// Admin Imports
import { DB } from './admin/data.js';
import { AdminLayout } from './admin/layout.js';
import { AdminDashboard } from './admin/pages/dashboard.js';
import { AdminCourses } from './admin/pages/courses.js';
import { AdminUsers } from './admin/pages/users.js';
import { AdminEnrollments } from './admin/pages/enrollments.js';
import { AdminReports } from './admin/pages/reports.js';
import { Login } from './pages/login.js';

// Initialize Simulated DB
let isAppInitialized = false;
const initAppPromise = (async () => {
    try {
        await DB.init();
        isAppInitialized = true;
    } catch (e) {
        console.warn('Database initialization failed:', e);
    }
})();

const routes = {
    '/': Home,
    '/cursos': Courses,
    '/impacto': Mission,
    // Admin Routes
    '/admin': AdminDashboard,
    '/admin/cursos': AdminCourses,
    '/admin/usuarios': AdminUsers,
    '/admin/inscripciones': AdminEnrollments,
    '/admin/reportes': AdminReports,
    
    // Auth
    '/login': Login
};

const router = async () => {
    const view = document.getElementById('router-view');
    const path = window.location.hash.slice(1) || '/';
    
    // Start exit transition
    view.classList.add('opacity-0');

    try {
        // 1. Prepare component and content in parallel with a minimum transition delay
        const renderTask = (async () => {
            if (!isAppInitialized) await initAppPromise;
            
            const component = routes[path] || Home;
            // Pre-fetch specific data if needed
            if (path === '/admin/cursos') await DB.fetchCourses();
            if (path === '/admin/usuarios') await DB.fetchUsers();
            
            const content = await component.render();
            return { component, content };
        })();

        // 2. Wait for at least 150ms (animation sync) AND the render to finish
        const [_, { component, content }] = await Promise.all([
            new Promise(resolve => setTimeout(resolve, 150)),
            renderTask
        ]);

        let finalContent = content;

        // 3. Handle Layouts (Admin vs Public)
        if (path.startsWith('/admin')) {
            finalContent = AdminLayout.render(content);
            document.querySelector('header')?.classList.add('hidden');
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.remove('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
        } else if (path === '/login') {
            document.querySelector('header')?.classList.remove('hidden');
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.add('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
        } else {
            document.querySelector('header')?.classList.remove('hidden');
            document.querySelector('footer')?.classList.remove('hidden');
            view.classList.add('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
        }

        // 4. Atomic Swap
        view.innerHTML = finalContent;
        
        // 5. Post-render logic
        if (path.startsWith('/admin') && AdminLayout.afterRender) {
            await AdminLayout.afterRender();
        }
        if (component.afterRender) await component.afterRender();
        
        // 6. Reveal
        view.classList.remove('opacity-0');
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Router Error:', error);
        view.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                <span class="material-symbols-outlined text-accent text-6xl mb-4">error</span>
                <h2 class="text-3xl font-bold text-primary mb-2">¡Ups! Algo salió mal</h2>
                <p class="text-on-surface/60 mb-8">No pudimos cargar esta sección. Por favor, intenta recargar la página.</p>
                <button onclick="location.reload()" class="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Recargar</button>
            </div>
        `;
        view.classList.remove('opacity-0');
    }
};

// Listen for hash changes
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    router();
    
    // Auth Button routing
    const btnDesktop = document.getElementById('btn-mi-cuenta-desktop');
    const btnMobile = document.getElementById('btn-mi-cuenta-mobile');
    
    if(btnDesktop) btnDesktop.onclick = () => window.location.hash = '#/login';
    if(btnMobile) btnMobile.onclick = () => {
        document.getElementById('mobile-menu-backdrop')?.click(); // Close menu
        window.location.hash = '#/login';
    };
});

// Global State (Simple)
window.state = {
    user: { name: 'Visitante', loggedIn: false },
    cart: []
};
