import { DB } from '../admin/data.js';

export const StudentDashboard = {
    render: async () => {
        const user = window.state.user;
        if (!user || !user.loggedIn) {
            window.location.hash = '#/login';
            return '';
        }

        // Fetch real enrollments for current user
        const enrollments = await DB.fetchUserEnrollments(user.id);

        // Calculate stats
        const activeCount = enrollments.filter(e => e.status === 'active').length;
        const completedCount = enrollments.filter(e => e.status === 'completed').length;
        const avgProgress = enrollments.length > 0 
            ? Math.round(enrollments.reduce((acc, e) => acc + (e.progress || 0), 0) / enrollments.length) 
            : 0;
        const totalHours = enrollments.reduce((acc, e) => {
            const h = parseInt(e.courses?.duration) || 0;
            return acc + h;
        }, 0);

        return `
        <div class="h-full overflow-y-auto scroll-smooth bg-surface pb-12" role="main" aria-label="Panel del estudiante">
            <div class="max-w-6xl mx-auto px-4">
                <!-- Sticky Header Section -->
                <div class="sticky top-0 z-40 bg-surface/95 backdrop-blur-md py-6 md:py-8 -mx-4 px-4 space-y-8 mb-4">
                <!-- Welcome Section -->
                <section class="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-6 md:p-10 text-white shadow-xl" aria-label="Bienvenida">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    
                    <div class="relative z-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                        <div class="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white p-1 shadow-lg shrink-0">
                            <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=003F87&color=fff`}" 
                                 alt="Foto de perfil de ${user.name || user.email}" 
                                 class="w-full h-full object-cover rounded-xl">
                        </div>
                        <div class="space-y-1">
                            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Panel del Estudiante</p>
                            <h1 class="text-2xl md:text-3xl font-headline font-bold tracking-tight">Hola, ${user.name || 'Estudiante'}</h1>
                            <p class="text-sm text-white/70 max-w-lg leading-relaxed hidden md:block">
                                Bienvenido a tu espacio de aprendizaje inclusivo. Sigue avanzando a tu ritmo.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Quick Stats -->
                <section aria-label="Resumen de progreso">
                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-white p-4 md:p-5 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all" role="status" aria-label="${activeCount} cursos activos">
                            <div class="flex items-center gap-3 mb-2 md:mb-3">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                    <span class="material-symbols-outlined text-lg">school</span>
                                </div>
                                <p class="text-[10px] md:text-xs font-bold text-on-surface/40 uppercase tracking-wider">Activos</p>
                            </div>
                            <p class="text-xl md:text-2xl font-headline font-black text-primary">${activeCount}</p>
                        </div>
                        <div class="bg-white p-4 md:p-5 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all" role="status" aria-label="${completedCount} cursos completados">
                            <div class="flex items-center gap-3 mb-2 md:mb-3">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                                    <span class="material-symbols-outlined text-lg">verified</span>
                                </div>
                                <p class="text-[10px] md:text-xs font-bold text-on-surface/40 uppercase tracking-wider">Completados</p>
                            </div>
                            <p class="text-xl md:text-2xl font-headline font-black text-secondary">${completedCount}</p>
                        </div>
                        <div class="bg-white p-4 md:p-5 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all" role="status" aria-label="Progreso promedio ${avgProgress} por ciento">
                            <div class="flex items-center gap-3 mb-2 md:mb-3">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                    <span class="material-symbols-outlined text-lg">trending_up</span>
                                </div>
                                <p class="text-[10px] md:text-xs font-bold text-on-surface/40 uppercase tracking-wider">Progreso</p>
                            </div>
                            <p class="text-xl md:text-2xl font-headline font-black text-accent">${avgProgress}%</p>
                        </div>
                        <div class="bg-white p-4 md:p-5 rounded-2xl border border-surface-variant shadow-sm hover:shadow-md transition-all" role="status" aria-label="${totalHours} horas totales de estudio">
                            <div class="flex items-center gap-3 mb-2 md:mb-3">
                                <div class="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                    <span class="material-symbols-outlined text-lg">schedule</span>
                                </div>
                                <p class="text-[10px] md:text-xs font-bold text-on-surface/40 uppercase tracking-wider">Horas</p>
                            </div>
                            <p class="text-xl md:text-2xl font-headline font-black text-blue-600">${totalHours}h</p>
                        </div>
                    </div>
                </section>
            </div>

            <!-- Enrolled Courses Section -->
            <section class="space-y-6" aria-label="Mis cursos inscritos">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-headline font-bold text-primary">Mis Cursos</h2>
                    <a href="#/cursos" class="text-primary font-bold text-sm underline underline-offset-4 decoration-2 accessible-focus">Explorar más cursos</a>
                </div>

                ${enrollments.length === 0 ? `
                    <div class="text-center py-12 bg-surface-variant/30 rounded-3xl border-2 border-dashed border-surface-variant/50" role="status">
                        <span class="material-symbols-outlined text-5xl text-on-surface/20 mb-3 block">school</span>
                        <h3 class="text-lg font-bold text-on-surface/60">Aún no estás inscrito en ningún curso</h3>
                        <p class="text-on-surface/40 mt-1 mb-6 text-sm">Empieza hoy tu camino hacia el aprendizaje inclusivo.</p>
                        <a href="#/cursos" class="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-primary/20 inline-block accessible-focus">Ver Catálogo</a>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${enrollments.map(env => `
                        <article class="group bg-white rounded-3xl border border-surface-variant overflow-hidden hover:shadow-xl transition-all duration-300" aria-label="Curso: ${env.courses.title}, progreso ${env.progress} por ciento">
                            <div class="h-40 overflow-hidden relative">
                                <img src="${env.courses.img}" alt="" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
                                <div class="absolute top-3 right-3">
                                    <span class="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${env.status === 'active' ? 'text-primary border-primary/20' : 'text-secondary border-secondary/20'}">${env.status === 'active' ? 'En Curso' : 'Completado'}</span>
                                </div>
                            </div>
                            
                            <div class="p-6 space-y-4">
                                <div>
                                    <h3 class="text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">${env.courses.title}</h3>
                                    <div class="flex items-center gap-3 mt-2 text-xs text-on-surface/50 font-medium">
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">category</span>${env.courses.category}</span>
                                        <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span>${env.courses.duration}</span>
                                    </div>
                                </div>

                                <div class="space-y-1.5" role="progressbar" aria-valuenow="${env.progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso del curso">
                                    <div class="flex justify-between text-xs font-bold">
                                        <span class="text-on-surface/40">Progreso</span>
                                        <span class="text-primary">${env.progress}%</span>
                                    </div>
                                    <div class="w-full bg-surface-variant rounded-full h-2.5 overflow-hidden">
                                        <div class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style="width: ${env.progress}%"></div>
                                    </div>
                                </div>

                                <button class="w-full bg-surface-variant text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm group-hover:bg-primary group-hover:text-white transition-all accessible-focus" aria-label="${env.progress > 0 ? 'Continuar' : 'Empezar'} curso ${env.courses.title}">
                                    <span class="material-symbols-outlined text-lg">play_circle</span>
                                    <span>${env.progress > 0 ? 'Continuar' : 'Empezar Curso'}</span>
                                </button>
                            </div>
                        </article>
                        `).join('')}
                    </div>
                `}
            </section>

            <!-- Quick Actions -->
            <section class="flex flex-wrap gap-4 pt-4 border-t border-surface-variant" aria-label="Acciones rápidas">
                <a href="#/cursos" class="flex items-center gap-2 px-5 py-3 bg-white border border-surface-variant rounded-2xl font-bold text-sm text-on-surface/70 hover:text-primary hover:border-primary/30 transition-all accessible-focus">
                    <span class="material-symbols-outlined text-lg">explore</span>
                    Explorar Catálogo
                </a>
                <button onclick="window.location.hash='#/'" class="flex items-center gap-2 px-5 py-3 bg-white border border-surface-variant rounded-2xl font-bold text-sm text-on-surface/70 hover:text-accent hover:border-accent/30 transition-all accessible-focus">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </section>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        // Handle Course Interaction
        const courseButtons = document.querySelectorAll('button[aria-label*="curso"]');
        courseButtons.forEach(btn => {
            btn.onclick = async () => {
                // Find course ID from context (extracted from aria-label in this simple case)
                const courseTitle = btn.getAttribute('aria-label').split('curso ')[1];
                const course = DB.getCourses().find(c => c.title === courseTitle);
                
                if (course) {
                    console.log('Cargando curso:', course.title);
                    // Fetch first lesson with LSC for demonstration
                    const content = await DB.fetchCourseContent(course.id);
                    const firstLesson = content[0]?.lessons?.[0];
                    
                    if (firstLesson && firstLesson.lsc_video_url) {
                        window.dispatchEvent(new CustomEvent('lsc-video-update', { 
                            detail: firstLesson.lsc_video_url 
                        }));
                        
                        // Notify user
                        if (!window.state.lscEnabled) {
                            alert('Este curso tiene contenido en Lengua de Señas. Actívalo en el menú de accesibilidad.');
                        }
                    }
                }
            };
        });
    }
};
