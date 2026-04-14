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
DB.init();

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
        const component = routes[path] || Home;
        let content = await component.render();

        // If it's an admin path, wrap it in AdminLayout
        if (path.startsWith('/admin')) {
            content = AdminLayout.render(content);
            // Remove main header/footer if in admin mode
            document.querySelector('header').classList.add('hidden');
            document.querySelector('footer').classList.add('hidden');
        } else {
            document.querySelector('header').classList.remove('hidden');
            document.querySelector('footer').classList.remove('hidden');
        }

        view.innerHTML = content;
        if (component.afterRender) await component.afterRender();
        
        view.classList.remove('opacity-0');
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
