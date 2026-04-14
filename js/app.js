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

// Initialize Simulated DB
const initApp = async () => {
    try {
        await DB.init();
    } catch (e) {
        console.warn('Database initialization failed:', e);
    }
};
initApp();

const routes = {
    '/': Home,
    '/cursos': Courses,
    '/impacto': Mission,
    // Admin Routes
    '/admin': AdminDashboard,
    '/admin/cursos': AdminCourses,
    '/admin/usuarios': AdminUsers
};

const router = async () => {
    const view = document.getElementById('router-view');
    const path = window.location.hash.slice(1) || '/';
    
    // Smooth transition
    view.classList.add('opacity-0');
    
    setTimeout(async () => {
        try {
            const component = routes[path] || Home;
            let content = await component.render();

            // If it's an admin path, wrap it in AdminLayout
            if (path.startsWith('/admin')) {
                content = AdminLayout.render(content);
                document.querySelector('header')?.classList.add('hidden');
                document.querySelector('footer')?.classList.add('hidden');
            } else {
                document.querySelector('header')?.classList.remove('hidden');
                document.querySelector('footer')?.classList.remove('hidden');
            }

            view.innerHTML = content;
            
            // Execute afterRender for both layout (if admin) and component
            if (path.startsWith('/admin') && AdminLayout.afterRender) {
                await AdminLayout.afterRender();
            }
            
            if (component.afterRender) await component.afterRender();
            
            view.classList.remove('opacity-0');
        } catch (error) {
            console.error('Router Error:', error);
            view.innerHTML = `
                <div class="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
                    <span class="material-symbols-outlined text-accent text-6xl mb-4">error</span>
                    <h2 class="text-3xl font-bold text-primary mb-2">¡Ups! Algo salió mal</h2>
                    <p class="text-on-surface/60 mb-8">No pudimos cargar esta sección. Por favor, intenta recargar la página.</p>
                    <button onclick="location.reload()" class="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary/20">Recargar</button>
                    <p class="mt-8 text-[10px] text-on-surface/20 uppercase tracking-widest">${error.message}</p>
                </div>
            `;
            view.classList.remove('opacity-0');
        }
        window.scrollTo(0, 0);
    }, 200);
};

// Listen for hash changes
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Global State (Simple)
window.state = {
    user: { name: 'Visitante', loggedIn: false },
    cart: []
};
