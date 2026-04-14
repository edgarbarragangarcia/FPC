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

        return `
        <div class="max-w-7xl mx-auto py-8 md:py-12 px-4 space-y-12 animate-in fade-in duration-700">
            <!-- Welcome Hero Section -->
            <section class="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 rounded-[3rem] p-8 md:p-16 text-white shadow-2xl shadow-primary/20">
                <div class="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                    <div class="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] bg-white p-1.5 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        <img src="${user.avatar || `https://ui-avatars.com/api/?name=${user.email}&background=003F87&color=fff`}" 
                             alt="Avatar de ${user.name || user.email}" 
                             class="w-full h-full object-cover rounded-[2.2rem]">
                    </div>
                    <div class="space-y-4">
                        <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em]">Panel del Estudiante</span>
                        <h1 class="text-4xl md:text-6xl font-headline font-extrabold tracking-tight">Hola, ${user.name || 'Estudiante'} 👋</h1>
                        <p class="text-lg md:text-xl text-white/80 font-medium max-w-xl italic">
                            "La educación es el arma más poderosa para cambiar el mundo." — Nelson Mandela.
                        </p>
                    </div>
                </div>
            </section>

            <!-- Quick Stats -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-8 rounded-[2.5rem] border border-surface-variant shadow-sm hover:shadow-xl transition-all group">
                    <div class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-primary group-hover:text-white">
                        <span class="material-symbols-outlined font-bold">rocket_launch</span>
                    </div>
                    <p class="text-3xl font-headline font-black text-primary">${activeCount}</p>
                    <p class="text-xs font-black text-on-surface/40 uppercase tracking-widest mt-1">Cursos Activos</p>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] border border-surface-variant shadow-sm hover:shadow-xl transition-all group">
                    <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-secondary group-hover:text-white">
                        <span class="material-symbols-outlined font-bold">verified</span>
                    </div>
                    <p class="text-3xl font-headline font-black text-secondary">${completedCount}</p>
                    <p class="text-xs font-black text-on-surface/40 uppercase tracking-widest mt-1">Completados</p>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] border border-surface-variant shadow-sm hover:shadow-xl transition-all group">
                    <div class="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-accent group-hover:text-white">
                        <span class="material-symbols-outlined font-bold">trending_up</span>
                    </div>
                    <p class="text-3xl font-headline font-black text-accent">${avgProgress}%</p>
                    <p class="text-xs font-black text-on-surface/40 uppercase tracking-widest mt-1">Progreso Medio</p>
                </div>
                <div class="bg-white p-8 rounded-[2.5rem] border border-surface-variant shadow-sm hover:shadow-xl transition-all group">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:bg-blue-600 group-hover:text-white">
                        <span class="material-symbols-outlined font-bold">schedule</span>
                    </div>
                    <p class="text-3xl font-headline font-black text-blue-600">--</p>
                    <p class="text-xs font-black text-on-surface/40 uppercase tracking-widest mt-1">Horas Totales</p>
                </div>
            </div>

            <!-- Enrolled Courses Section -->
            <section class="space-y-8">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl font-headline font-bold text-primary">Mis Cursos</h2>
                    <a href="#/cursos" class="text-primary font-bold text-sm underline underline-offset-4 decoration-2">Explorar más</a>
                </div>

                ${enrollments.length === 0 ? `
                    <div class="text-center py-20 bg-surface-variant/30 rounded-[3rem] border-2 border-dashed border-surface-variant/50">
                        <span class="material-symbols-outlined text-6xl text-on-surface/20 mb-4 font-light">school</span>
                        <h3 class="text-xl font-bold text-on-surface/60">Aún no estás inscrito en ningún curso.</h3>
                        <p class="text-on-surface/40 mt-2 mb-8">Empieza hoy mismo tu camino hacia el aprendizaje inclusivo.</p>
                        <a href="#/cursos" class="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all inline-block">Ver Catálogo</a>
                    </div>
                ` : `
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${enrollments.map(env => `
                        <div class="group bg-white rounded-[2.5rem] border border-surface-variant overflow-hidden hover:shadow-2xl transition-all duration-500">
                            <div class="h-48 overflow-hidden relative">
                                <img src="${env.courses.img}" alt="${env.courses.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                                <div class="absolute top-4 right-4">
                                    <span class="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-primary/10">${env.status === 'active' ? 'En Curso' : 'Completado'}</span>
                                </div>
                            </div>
                            
                            <div class="p-8 space-y-6">
                                <div class="space-y-2">
                                    <h3 class="text-2xl font-headline font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">${env.courses.title}</h3>
                                    <p class="text-[10px] font-black text-on-surface/30 uppercase tracking-[0.2em]">${env.courses.category}</p>
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between text-[11px] font-black uppercase tracking-wider">
                                        <span class="text-on-surface/40">Progreso</span>
                                        <span class="text-primary">${env.progress}%</span>
                                    </div>
                                    <div class="w-full bg-surface-variant rounded-full h-3 overflow-hidden shadow-inner p-0.5">
                                        <div class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style="width: ${env.progress}%"></div>
                                    </div>
                                </div>

                                <button class="w-full bg-surface-variant text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-3 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <span class="material-symbols-outlined text-[22px] font-light">play_circle</span>
                                    <span>${env.progress > 0 ? 'Continuar Aprendiendo' : 'Empezar Curso'}</span>
                                </button>
                            </div>
                        </div>
                        `).join('')}
                    </div>
                `}
            </section>
        </div>
        `;
    },
    afterRender: async () => {}
};
