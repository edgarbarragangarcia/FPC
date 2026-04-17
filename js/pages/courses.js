// Courses Page Component
import { DB } from '../admin/data.js';

export const Courses = {
    render: async () => {
        const dummyCourses = DB.getCourses();

        return `
        <div class="max-w-7xl mx-auto py-12">
            <header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl flex flex-col md:flex-row md:items-end justify-between gap-8 py-10 mb-12 px-4 -mx-4">
                <div class="space-y-4">
                    <h2 class="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">Catálogo de Cursos</h2>
                    <p class="text-on-surface/60 max-w-xl">
                        Explora nuestra oferta educativa diseñada con los más altos estándares de accesibilidad universal.
                    </p>
                </div>
                
                <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <button class="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap">Todos</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Tecnología</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Negocios</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Bienestar</button>
                </div>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                ${dummyCourses.map(course => `
                <div class="group bg-surface rounded-[2.5rem] border border-surface-variant overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                    <div class="h-64 overflow-hidden relative">
                        <img src="${course.img}" alt="${course.title}" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
                        <div class="absolute top-4 left-4 flex gap-2">
                            <span class="bg-surface/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/10">${course.category}</span>
                            <span class="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${course.level}</span>
                        </div>
                    </div>
                    
                    <div class="p-8 flex flex-col flex-1">
                        <h3 class="text-2xl font-headline font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors">${course.title}</h3>
                        <p class="text-sm text-on-surface/60 mb-6 flex-1">Potencia tus habilidades con este curso especializado de ${course.duration} enfocado en resultados reales.</p>
                        
                        <div class="flex items-center justify-between border-t border-surface-variant pt-6">
                            <div class="flex items-center gap-2 text-primary font-bold">
                                <span class="material-symbols-outlined text-sm">schedule</span>
                                <span class="text-sm">${course.duration}</span>
                            </div>
                            <button data-id="${course.id}" class="course-detail-btn bg-surface-variant text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all accessible-focus">
                                <span class="material-symbols-outlined pointer-events-none">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Empty state or footer in explorer -->
            <div class="mt-20 text-center p-12 bg-primary/5 rounded-[3rem] border border-dashed border-primary/20 mx-4">
                <p class="font-bold text-primary">¿No encuentras lo que buscas?</p>
                <p class="text-sm text-on-surface/60 mt-2 mb-6">Estamos agregando nuevos cursos mensualmente adaptados a tus necesidades.</p>
                <button class="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 mx-auto">
                   <span class="material-symbols-outlined">support_agent</span>
                   Solicitar una temática
                </button>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const modal = document.getElementById('course-detail-modal');
        const content = document.getElementById('course-detail-content');
        const renderRoot = document.getElementById('course-detail-render');
        const closeBtn = document.getElementById('close-course-detail');

        const openModal = async (courseId) => {
            const courses = DB.getCourses();
            const course = courses.find(c => c.id == courseId);
            if (!course) return;

            modal.classList.remove('hidden');
            renderRoot.innerHTML = `
                <div class="flex items-center justify-center p-12">
                    <span class="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
                </div>
            `;
            
            setTimeout(() => {
                modal.classList.replace('opacity-0', 'opacity-100');
                content.classList.replace('translate-y-10', 'translate-y-0');
            }, 10);

            // Fetch Syllabus
            const modules = await DB.fetchCourseContent(courseId);
            
            renderRoot.innerHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Left: Info -->
                    <div class="space-y-6">
                        <div class="space-y-2">
                            <span class="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">${course.category}</span>
                            <h2 class="text-4xl font-headline font-bold text-primary leading-tight">${course.title}</h2>
                        </div>
                        <p class="text-on-surface/70 leading-relaxed text-lg">${course.description || 'Este curso está diseñado para potenciar tus habilidades profesionales de manera inclusiva.'}</p>
                        
                        <div class="flex flex-wrap gap-4 text-sm font-bold pt-4">
                            <div class="flex items-center gap-2 bg-surface p-4 rounded-2xl border border-surface-variant flex-1 min-w-[140px]">
                                <span class="material-symbols-outlined text-primary">schedule</span>
                                <div>
                                    <p class="text-[10px] text-on-surface/40 uppercase">Duración</p>
                                    <p class="text-primary">${course.duration}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 bg-surface p-4 rounded-2xl border border-surface-variant flex-1 min-w-[140px]">
                                <span class="material-symbols-outlined text-secondary">verified</span>
                                <div>
                                    <p class="text-[10px] text-on-surface/40 uppercase">Nivel</p>
                                    <p class="text-secondary">${course.level}</p>
                                </div>
                            </div>
                        </div>

                        <button id="enroll-btn-${course.id}" class="w-full bg-gradient-to-r from-primary to-primary/80 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                            <span class="material-symbols-outlined">rocket_launch</span>
                            <span id="enroll-text-${course.id}">Inscribirme Ahora</span>
                        </button>
                    </div>

                    <!-- Right: Syllabus -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-headline font-bold text-primary flex items-center gap-3">
                            <span class="material-symbols-outlined">menu_book</span>
                            Temario del Curso
                        </h3>
                        
                        <div class="space-y-4">
                            ${modules.length === 0 ? `
                                <p class="text-on-surface/40 italic p-8 bg-surface rounded-3xl text-center border-2 border-dashed border-surface-variant">Próximamente disponible</p>
                            ` : modules.map((mod, i) => `
                                <div class="bg-surface/50 border border-surface-variant/50 rounded-3xl overflow-hidden">
                                    <div class="px-6 py-4 bg-surface/50 border-b border-surface-variant/50 flex items-center gap-4">
                                        <span class="w-8 h-8 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-sm">${i+1}</span>
                                        <h4 class="font-bold text-primary text-sm">${mod.title}</h4>
                                    </div>
                                    <div class="p-2 space-y-1">
                                        ${(mod.lessons || []).map(lesson => `
                                            <div class="flex items-center gap-3 px-4 py-2 hover:bg-surface rounded-xl transition-colors">
                                                <span class="material-symbols-outlined text-lg text-on-surface/30">
                                                    ${lesson.content_type === 'video' ? 'play_circle' : 'article'}
                                                </span>
                                                <span class="text-sm font-medium text-on-surface/70 truncate">${lesson.title}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            // Attach enrollment handler
            const enrollBtn = document.getElementById(`enroll-btn-${course.id}`);
            const enrollText = document.getElementById(`enroll-text-${course.id}`);

            enrollBtn.onclick = async () => {
                if (!window.state.user || !window.state.user.loggedIn) {
                    window.location.hash = '#/login';
                    return;
                }

                enrollText.innerText = 'Procesando...';
                enrollBtn.disabled = true;

                try {
                    const res = await DB.enrollInCourse(courseId, window.state.user.id);
                    if (res.status === 'success' || res.status === 'already_enrolled') {
                        enrollText.innerText = '¡Inscrito!';
                        enrollBtn.classList.replace('from-primary', 'from-secondary');
                        setTimeout(() => {
                            closeModal();
                            window.location.hash = '#/dashboard';
                        }, 1000);
                    }
                } catch (err) {
                    console.error(err);
                    enrollText.innerText = 'Error al inscribir';
                    enrollBtn.disabled = false;
                }
            };
        };

        const closeModal = () => {
            modal.classList.replace('opacity-100', 'opacity-0');
            content.classList.replace('translate-y-0', 'translate-y-10');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        };

        // Listen for clicks on arrow buttons
        document.querySelectorAll('.course-detail-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.stopPropagation();
                openModal(btn.dataset.id);
            };
        });

        closeBtn.onclick = closeModal;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }
};
