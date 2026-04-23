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
import { StudentDashboard } from './pages/studentDashboard.js';
import { CoursePlayer } from './pages/coursePlayer.js';
import { Interpreter } from './components/interpreter.js';
import { supabase } from './admin/data.js';
import { i18n } from './i18n.js';
import { Notifications } from './components/notifications.js';
window.i18n = i18n;

// Initialize Notifications UI container
Notifications.init();

// Global State Initialized Early
window.state = {
    user: { name: 'Visitante', loggedIn: false },
    cart: [],
    lscEnabled: false,
    voiceEnabled: false
};

// Initialize Components
Interpreter.init();

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
    '/login': Login,
    '/dashboard': StudentDashboard,
    '/curso': CoursePlayer
};

const router = async () => {
    const view = document.getElementById('router-view');
    const path = window.location.hash.slice(1) || '/';

    try {
        // Prepare content
        if (!isAppInitialized) await initAppPromise;
        
        const routePath = path.split('?')[0];
        const component = routes[routePath] || Home;
        // Pre-fetch specific data if needed
        if (path === '/admin/cursos') await DB.fetchCourses();
        if (path === '/admin/usuarios') await DB.fetchUsers();
        
        let content = await component.render();

        // Handle Layouts (Admin vs Public)
        const mainHeader = document.getElementById('main-header');
        if (mainHeader) mainHeader.classList.remove('hidden');
        
        // Account for fixed header height
        document.body.style.paddingTop = '80px';
        
        if (path.startsWith('/admin')) {
            content = AdminLayout.render(content);
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.remove('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
            document.body.classList.add('h-screen', 'overflow-hidden');
        } else if (path === '/dashboard' || path === '/curso' || path === '/login') {
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.remove('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
            view.classList.add('h-full');
            if (path !== '/login') document.body.classList.add('h-screen', 'overflow-hidden');
            else document.body.classList.remove('h-screen', 'overflow-hidden');
        } else {
            document.querySelector('footer')?.classList.remove('hidden');
            view.classList.add('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
            view.classList.remove('h-full');
            document.body.classList.remove('h-screen', 'overflow-hidden');
        }

        // Immediate Swap
        view.innerHTML = content;
        
        // Post-render logic
        if (path.startsWith('/admin') && AdminLayout.afterRender) {
            await AdminLayout.afterRender();
        }
        if (component.afterRender) await component.afterRender();
        
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
    }
};

// Listen for hash changes
// Auth Persistence Logic
const checkSession = async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            const { data: profiles } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .limit(1);
            
            const profile = profiles && profiles.length > 0 ? profiles[0] : null;
            
            if (profile) {
                window.state.user = {
                    loggedIn: true,
                    email: session.user.email,
                    id: profile.id,
                    role: profile.role,
                    name: profile.name,
                    avatar: profile.avatar
                };
            }
        }
    } catch (e) {
        console.warn('Session check failed:', e);
    }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
    await checkSession();
    router();
    
    // Dropdown & Auth Logic
    const btnDesktop = document.getElementById('btn-mi-cuenta-desktop');
    const btnMobile = document.getElementById('btn-mi-cuenta-mobile');
    const userDropdown = document.getElementById('user-dropdown');
    const btnLogoutGlobal = document.getElementById('btn-logout-global');
    
    // Update Dropdown UI based on state
    const updateDropdownUI = () => {
        const nameEl = document.getElementById('dropdown-user-name');
        const roleEl = document.getElementById('dropdown-user-role');
        const infoEl = document.getElementById('user-info-dropdown');
        const panelLink = document.getElementById('dropdown-panel-link');

        if (window.state.user && window.state.user.loggedIn) {
            nameEl.innerText = window.state.user.name || window.state.user.email;
            roleEl.innerText = window.state.user.role === 'admin' ? 'Administrador' : 'Estudiante';
            infoEl.classList.remove('hidden');

            if (window.state.user.role === 'admin') {
                panelLink.href = '#/admin';
                panelLink.innerHTML = '<span class="material-symbols-outlined text-lg">admin_panel_settings</span>Administración';
            } else {
                panelLink.href = '#/dashboard';
                panelLink.innerHTML = '<span class="material-symbols-outlined text-lg">dashboard</span>Mi Panel';
            }
        } else {
            infoEl.classList.add('hidden');
            panelLink.href = '#/dashboard';
            panelLink.innerHTML = '<span class="material-symbols-outlined text-lg">dashboard</span>Mi Panel';
        }
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        if (window.state.user && window.state.user.loggedIn) {
            userDropdown.classList.toggle('hidden');
            updateDropdownUI();
        } else {
            window.location.hash = '#/login';
        }
    };

    if(btnDesktop) btnDesktop.onclick = toggleDropdown;
    if(btnMobile) btnMobile.onclick = toggleDropdown;

    // Global Click to close dropdown
    window.addEventListener('click', () => {
        userDropdown?.classList.add('hidden');
    });

    // Global Logout
    if (btnLogoutGlobal) {
        btnLogoutGlobal.onclick = async () => {
            const { supabase } = await import('./admin/data.js');
            await supabase.auth.signOut();
            window.state.user = { name: 'Visitante', loggedIn: false };
            updateDropdownUI();
            
            // Si ya estamos en inicio, forzamos re-render. Si no, cambiar el hash disparará el router naturalmente.
            if (window.location.hash === '#/') {
                window.dispatchEvent(new Event('hashchange'));
            } else {
                window.location.hash = '#/';
            }
        };
    }
});

