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
import { Interpreter } from './components/interpreter.js';

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
    '/dashboard': StudentDashboard
};

const router = async () => {
    const view = document.getElementById('router-view');
    const path = window.location.hash.slice(1) || '/';

    try {
        // Prepare content
        if (!isAppInitialized) await initAppPromise;
        
        const component = routes[path] || Home;
        // Pre-fetch specific data if needed
        if (path === '/admin/cursos') await DB.fetchCourses();
        if (path === '/admin/usuarios') await DB.fetchUsers();
        
        let content = await component.render();

        // Handle Layouts (Admin vs Public)
        if (path.startsWith('/admin')) {
            content = AdminLayout.render(content);
            document.querySelector('header')?.classList.add('hidden');
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.remove('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
        } else if (path === '/dashboard') {
            document.querySelector('header')?.classList.remove('hidden');
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.remove('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
            view.classList.add('h-full');
            document.body.classList.add('h-screen', 'overflow-hidden');
        } else if (path === '/login') {
            document.querySelector('header')?.classList.remove('hidden');
            document.querySelector('footer')?.classList.add('hidden');
            view.classList.add('p-6', 'md:pt-4', 'md:px-12', 'md:pb-12');
            view.classList.remove('h-full');
            document.body.classList.remove('h-screen', 'overflow-hidden');
        } else {
            document.querySelector('header')?.classList.remove('hidden');
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
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    router();
    
    // Auth Button routing
    const btnDesktop = document.getElementById('btn-mi-cuenta-desktop');
    const btnMobile = document.getElementById('btn-mi-cuenta-mobile');
    
    const handleAccountClick = () => {
        if (window.state.user && window.state.user.loggedIn) {
            if (window.state.user.role === 'admin') {
                window.location.hash = '#/admin';
            } else {
                window.location.hash = '#/dashboard';
            }
        } else {
            window.location.hash = '#/login';
        }
    };

    if(btnDesktop) btnDesktop.onclick = handleAccountClick;
    if(btnMobile) btnMobile.onclick = () => {
        document.getElementById('mobile-menu-backdrop')?.click(); // Close menu
        handleAccountClick();
    };

    // Voice Guide Initial Setup
    document.addEventListener('mouseover', (e) => {
        if (!window.state.voiceEnabled) return;
        const target = e.target.closest('a, button, h1, h2, h3, p');
        if (target && target.innerText) {
            speak(target.innerText);
        }
    });

    document.addEventListener('focusin', (e) => {
        if (!window.state.voiceEnabled) return;
        if (e.target && e.target.innerText) {
            speak(e.target.innerText);
        }
    });
});

const speak = (msg) => {
    if (!window.state.voiceEnabled || !msg) return;
    
    // Safety check: some browsers need a user interaction to start audio
    // but the toggle click should be enough.
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = 'es-CO';
    
    const voices = window.speechSynthesis.getVoices();
    
    // Refined search for Colombian or Spanish voices
    let selectedVoice = voices.find(v => v.lang === 'es-CO' || v.name.includes('Colombia') || v.name.includes('Salome'));
    if (!selectedVoice) selectedVoice = voices.find(v => v.lang.startsWith('es-')); // Any Spanish
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    utterance.rate = 1.0;
    utterance.volume = 1.0;
    
    // Performance optimization: only speak if text has changed significantly or after pause
    window.speechSynthesis.speak(utterance);
};

// Ensure voices are loaded
if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

window.toggleVoice = () => {
    window.state.voiceEnabled = !window.state.voiceEnabled;
    const btn = document.getElementById('voice-guide-toggle');
    const circle = document.getElementById('voice-circle');
    
    if (window.state.voiceEnabled) {
        btn.classList.add('bg-secondary');
        btn.classList.remove('bg-surface-variant');
        circle.style.transform = 'translateX(1.5rem)';
        
        // Immediate feedback attempt
        setTimeout(() => {
            speak("Recorrido por voz activado. Navega por la página para escuchar el contenido.");
        }, 100);
    } else {
        btn.classList.add('bg-surface-variant');
        btn.classList.remove('bg-secondary');
        circle.style.transform = 'translateX(0)';
        window.speechSynthesis.cancel();
    }
};

window.toggleLSC = () => {
    window.state.lscEnabled = !window.state.lscEnabled;
    const btn = document.getElementById('lsc-toggle');
    const circle = document.getElementById('lsc-circle');
    
    if (window.state.lscEnabled) {
        btn.classList.add('bg-secondary');
        btn.classList.remove('bg-surface-variant');
        circle.style.transform = 'translateX(1.5rem)';
    } else {
        btn.classList.add('bg-surface-variant');
        btn.classList.remove('bg-secondary');
        circle.style.transform = 'translateX(0)';
    }
    
    window.dispatchEvent(new CustomEvent('lsc-changed', { detail: window.state.lscEnabled }));
};

window.toggleReadingGuide = () => {
    const guide = document.getElementById('reading-guide');
    const btn = document.getElementById('reading-guide-toggle');
    const circle = document.getElementById('guide-circle');
    
    const isVisible = !guide.classList.contains('hidden');
    if (isVisible) {
        guide.classList.add('hidden');
        btn.classList.add('bg-surface-variant');
        btn.classList.remove('bg-secondary');
        circle.style.transform = 'translateX(0)';
        document.removeEventListener('mousemove', window.moveReadingGuide);
    } else {
        guide.classList.remove('hidden');
        btn.classList.add('bg-secondary');
        btn.classList.remove('bg-surface-variant');
        circle.style.transform = 'translateX(1.5rem)';
        window.moveReadingGuide = (e) => {
            guide.style.top = e.clientY + 'px';
        };
        document.addEventListener('mousemove', window.moveReadingGuide);
    }
};

// Global State (Simple)
window.state = {
    user: { name: 'Visitante', loggedIn: false },
    cart: [],
    lscEnabled: false,
    voiceEnabled: false
};
