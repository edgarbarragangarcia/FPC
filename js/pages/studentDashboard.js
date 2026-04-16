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
        <div class="h-screen flex flex-col bg-surface overflow-hidden" role="main" aria-label="Panel del estudiante">
            <!-- Fixed Top Section -->
            <div class="shrink-0 bg-surface border-b border-surface-variant/30 px-4 pt-6 md:pt-8 pb-4 z-40">
                <div class="max-w-6xl mx-auto space-y-6">
                    <!-- Welcome Section -->
                    <section class="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-5 md:p-8 text-white shadow-lg" aria-label="Bienvenida">
                        <div class="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                        <div class="relative z-10 flex items-center gap-5">
                            <div class="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white p-1 shadow-md shrink-0">
                                <img src="${user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=003F87&color=fff`}" 
                                     alt="Foto de perfil" class="w-full h-full object-cover rounded-lg">
                            </div>
                            <div>
                                <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">Estudiante FPC</p>
                                <h1 class="text-xl md:text-2xl font-headline font-bold tracking-tight">Hola, ${user.name || 'Estudiante'}</h1>
                            </div>
                        </div>
                    </section>

                    <!-- Quick Stats (Compact) -->
                    <section class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" aria-label="Resumen de progreso">
                        <div class="bg-white p-3 md:p-4 rounded-xl border border-surface-variant shadow-sm flex items-center gap-3">
                            <div class="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-lg">school</span>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-on-surface/40 uppercase">Activos</p>
                                <p class="text-lg font-black text-primary">${activeCount}</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 md:p-4 rounded-xl border border-surface-variant shadow-sm flex items-center gap-3">
                            <div class="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-lg">verified</span>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-on-surface/40 uppercase">Completados</p>
                                <p class="text-lg font-black text-secondary">${completedCount}</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 md:p-4 rounded-xl border border-surface-variant shadow-sm flex items-center gap-3">
                            <div class="w-10 h-10 bg-accent/10 text-accent rounded-lg flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-lg">trending_up</span>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-on-surface/40 uppercase">Progreso</p>
                                <p class="text-lg font-black text-accent">${avgProgress}%</p>
                            </div>
                        </div>
                        <div class="bg-white p-3 md:p-4 rounded-xl border border-surface-variant shadow-sm flex items-center gap-3">
                            <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                <span class="material-symbols-outlined text-lg">schedule</span>
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-on-surface/40 uppercase">Horas</p>
                                <p class="text-lg font-black text-blue-600">${totalHours}h</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Scrollable Course Section -->
            <div class="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
                <div class="max-w-6xl mx-auto space-y-8 pb-12">
                    <section class="space-y-6" aria-label="Mis cursos inscritos">
                        <div class="flex items-center justify-between">
                            <h2 class="text-2xl font-headline font-bold text-primary">Mis Cursos</h2>
                            <a href="#/cursos" class="text-primary font-bold text-sm underline underline-offset-4 decoration-2">Explorar más cursos</a>
                        </div>

                        ${enrollments.length === 0 ? `
                            <div class="text-center py-12 bg-surface-variant/30 rounded-3xl border-2 border-dashed border-surface-variant/50">
                                <span class="material-symbols-outlined text-5xl text-on-surface/20 mb-3 block">school</span>
                                <h3 class="text-lg font-bold text-on-surface/60">Aún no estás inscrito en ningún curso</h3>
                                <p class="text-on-surface/40 mt-1 mb-6 text-sm">Empieza hoy tu camino hacia el aprendizaje inclusivo.</p>
                                <a href="#/cursos" class="bg-primary text-white px-6 py-3 rounded-2xl font-bold">Ver Catálogo</a>
                            </div>
                        ` : `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                ${enrollments.map(env => `
                                <article class="group bg-white rounded-2xl border border-surface-variant overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div class="h-40 overflow-hidden relative">
                                        <img src="${env.courses.img}" alt="" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
                                        <div class="absolute top-3 right-3">
                                            <span class="bg-white/90 backdrop-blur-md text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${env.status === 'active' ? 'text-primary border-primary/20' : 'text-secondary border-secondary/20'}">${env.status === 'active' ? 'En Curso' : 'Completado'}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="p-5 space-y-4">
                                        <h3 class="font-bold text-primary leading-tight group-hover:text-secondary h-12 overflow-hidden">${env.courses.title}</h3>
                                        
                                        <div class="space-y-1.5">
                                            <div class="flex justify-between text-[10px] font-bold italic">
                                                <span class="text-on-surface/40">Progreso actual</span>
                                                <span class="text-primary">${env.progress}%</span>
                                            </div>
                                            <div class="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                                                <div class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style="width: ${env.progress}%"></div>
                                            </div>
                                        </div>

                                        <div class="flex gap-2">
                                    <button data-id="${env.courses.id}" class="btn-start-course flex-1 bg-surface-variant text-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm group-hover:bg-primary group-hover:text-white transition-all">
                                        <span class="material-symbols-outlined text-lg">play_circle</span>
                                        <span>${env.progress > 0 ? 'Continuar' : 'Empezar Curso'}</span>
                                    </button>
                                    <button data-id="${env.courses.id}" class="btn-unenroll p-3 text-on-surface/30 hover:text-accent hover:bg-accent/10 rounded-xl transition-all" title="Darme de baja">
                                        <span class="material-symbols-outlined text-xl">delete_forever</span>
                                    </button>
                                </div>
                                    </div>
                                </article>
                                `).join('')}
                            </div>
                        `}
                    </section>

                    <!-- Quick Actions -->
                    <section class="flex flex-wrap gap-4 pt-4 border-t border-surface-variant">
                        <a href="#/cursos" class="flex items-center gap-2 px-5 py-3 bg-white border border-surface-variant rounded-xl font-bold text-xs text-on-surface/70 hover:text-primary transition-all">
                            <span class="material-symbols-outlined text-lg">explore</span>
                            Explorar Catálogo
                        </a>
                        <button id="btn-logout" class="flex items-center gap-2 px-5 py-3 bg-white border border-surface-variant rounded-xl font-bold text-xs text-on-surface/70 hover:text-accent transition-all">
                    <span class="material-symbols-outlined text-lg">logout</span>
                    Cerrar Sesión
                </button>
                    </section>
                </div>
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
        // Handle Unenrollment
        document.querySelectorAll('.btn-unenroll').forEach(btn => {
            btn.onclick = async () => {
                if (confirm('¿Estás seguro que deseas darte de baja de este curso? Se perderá tu progreso.')) {
                    try {
                        await DB.unenrollCourse(btn.dataset.id, window.state.user.id);
                        window.location.reload(); // Refresh to update list
                    } catch (e) {
                        alert('No se pudo procesar la baja. Intenta de nuevo.');
                    }
                }
            };
        });

        // Handle Logout
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
            logoutBtn.onclick = async () => {
                const { supabase } = await import('../admin/data.js');
                await supabase.auth.signOut();
                window.state.user = { name: 'Visitante', loggedIn: false };
                window.location.hash = '#/';
                window.location.reload(); // Hard refresh to clear state
            };
        }
    }
};
