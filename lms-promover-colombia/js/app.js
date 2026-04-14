// LMS Modular Router & App Controller
import { Home } from './pages/home.js';
import { Courses } from './pages/courses.js';
import { Mission } from './pages/mission.js';

const routes = {
    '/': Home,
    '/cursos': Courses,
    '/impacto': Mission
};

const router = async () => {
    const view = document.getElementById('router-view');
    const path = window.location.hash.slice(1) || '/';
    
    // Smooth transition
    view.classList.add('opacity-0');
    
    setTimeout(async () => {
        const component = routes[path] || Home;
        view.innerHTML = await component.render();
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
