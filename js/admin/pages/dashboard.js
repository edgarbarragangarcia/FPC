// Admin Dashboard Page
import { DB } from '../data.js';

export const AdminDashboard = {
    render: async () => {
        const courses = DB.getCourses();
        const users = DB.getUsers();
        const logs = DB.getLogs();

        return `
        <div class="space-y-8 animate-in fade-in duration-700 pb-12">
            <!-- Premium Header -->
            <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                <div class="absolute top-0 right-0 w-64 h-64 bg-surface/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                    <h2 class="text-4xl font-headline font-extrabold tracking-tight">Panel de Control</h2>
                    <p class="text-white/80 text-lg font-medium">Bienvenido al sistema de administración del LMS FPC.</p>
                </div>
                
                <div class="flex gap-4">
                    <button class="relative z-10 bg-surface/10 hover:bg-surface text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <span class="material-symbols-outlined font-light text-[22px]">download</span> 
                        <span>Reporte Global</span>
                    </button>
                </div>
            </header>

            <!-- KPI Cards with Glassmorphism -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <p class="text-[11px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Total Cursos</p>
                    <div class="flex items-end justify-between">
                        <span class="text-5xl font-headline font-extrabold text-primary">${courses.length}</span>
                        <div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/10">
                            <span class="material-symbols-outlined text-[28px]">auto_stories</span>
                        </div>
                    </div>
                </div>
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <p class="text-[11px] font-black text-secondary uppercase tracking-[0.2em] mb-4">Estudiantes</p>
                    <div class="flex items-end justify-between">
                        <span class="text-5xl font-headline font-extrabold text-primary">${users.length}</span>
                        <div class="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center border border-secondary/10">
                            <span class="material-symbols-outlined text-[28px]">group</span>
                        </div>
                    </div>
                </div>
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <p class="text-[11px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">Inscripciones</p>
                    <div class="flex items-end justify-between">
                        <span class="text-5xl font-headline font-extrabold text-primary">124</span>
                        <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100">
                            <span class="material-symbols-outlined text-[28px]">how_to_reg</span>
                        </div>
                    </div>
                </div>
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <p class="text-[11px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Completitud</p>
                    <div class="flex items-end justify-between">
                        <span class="text-5xl font-headline font-extrabold text-primary">68%</span>
                        <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                            <span class="material-symbols-outlined text-[28px]">analytics</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Recent Activity Glassmorphism -->
                <div class="lg:col-span-2 space-y-8">
                    <div class="bg-surface/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
                        <h3 class="text-2xl font-headline font-extrabold text-primary mb-8 flex items-center gap-3">
                            <span class="material-symbols-outlined text-secondary">history</span>
                            Actividad Reciente
                        </h3>
                        <div class="space-y-6">
                            ${logs.length > 0 ? logs.map((log, i) => `
                                <div class="flex items-start gap-5 border-b border-surface-variant/40 pb-6 last:border-0 last:pb-0 group">
                                    <div class="w-3.5 h-3.5 rounded-full mt-1.5 ${i === 0 ? 'bg-secondary animate-pulse ring-4 ring-secondary/20' : 'bg-surface-variant'}"></div>
                                    <div class="flex-1">
                                        <p class="text-base font-bold text-on-surface/80 group-hover:text-primary transition-colors">${log.message}</p>
                                        <p class="text-[10px] text-on-surface/40 uppercase font-black tracking-widest mt-2">${log.created_at ? new Date(log.created_at).toLocaleString() : 'Recientemente'}</p>
                                    </div>
                                </div>
                            `).join('') : '<p class="text-on-surface/40 text-center font-bold py-12">No hay actividad reciente.</p>'}
                        </div>
                    </div>

                    <!-- New: Recent Users Summary -->
                    <div class="bg-surface/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-10">
                        <h3 class="text-2xl font-headline font-extrabold text-primary mb-8 flex items-center gap-3">
                            <span class="material-symbols-outlined text-accent">group</span>
                            Últimos Usuarios
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            ${users.slice(0, 4).map(user => `
                                <div class="flex items-center gap-4 p-4 rounded-2xl bg-surface/30 border border-surface-variant/20">
                                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                        ${user.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                                    </div>
                                    <div>
                                        <p class="text-sm font-bold text-primary truncate max-w-[150px]">${user.full_name}</p>
                                        <p class="text-[10px] text-on-surface/50 uppercase font-bold tracking-widest">${user.role}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Quick Actions Gradient -->
                <div class="flex flex-col gap-8">
                    <div class="relative overflow-hidden bg-gradient-to-br from-primary to-[#0052b4] text-white rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-xl shadow-primary/20 flex-1">
                        <div class="absolute -top-24 -right-24 w-48 h-48 bg-surface/10 rounded-full blur-2xl pointer-events-none"></div>
                        <div class="relative z-10">
                            <h3 class="text-2xl font-headline font-extrabold mb-3">Acciones Rápidas</h3>
                            <p class="text-white/70 text-sm font-medium mb-10">Accesos directos para la gestión inmediata.</p>
                            
                            <div class="space-y-4">
                                <a href="#/admin/cursos" class="w-full bg-surface/10 hover:bg-surface border border-white/20 hover:text-primary p-4.5 rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-lg group">
                                    <span class="font-bold">Nuevo Curso</span>
                                    <span class="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                                </a>
                                <a href="#/admin/usuarios" class="w-full bg-surface/10 hover:bg-surface border border-white/20 hover:text-primary p-4.5 rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-lg group">
                                    <span class="font-bold">Alta de Usuario</span>
                                    <span class="material-symbols-outlined group-hover:scale-110 transition-transform">person_add</span>
                                </a>
                                <a href="#/admin/reportes" class="w-full bg-surface/10 hover:bg-surface border border-white/20 hover:text-primary p-4.5 rounded-2xl flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-lg group">
                                    <span class="font-bold">Ver Reportes</span>
                                    <span class="material-symbols-outlined group-hover:scale-110 transition-transform">analytics</span>
                                </a>
                            </div>
                        </div>
                        
                        <div class="relative z-10 mt-12 pt-8 border-t border-white/20">
                            <p class="text-[10px] text-white/50 uppercase font-black tracking-[0.2em] mb-4">Ayuda del Sistema</p>
                            <a href="#" class="text-sm font-bold flex items-center gap-3 hover:text-white/80 transition-colors">
                                <span class="material-symbols-outlined text-lg">menu_book</span> Manual de Administrador
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {}
};
