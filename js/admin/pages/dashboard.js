// Admin Dashboard Page
import { DB } from '../data.js';

export const AdminDashboard = {
    render: async () => {
        const courses = DB.getCourses();
        const users = DB.getUsers();
        const logs = DB.getLogs();

        return `
        <div class="space-y-8 animate-in fade-in duration-500">
            <header class="flex justify-between items-center">
                <div>
                    <h2 class="text-3xl font-headline font-bold text-primary">Panel de Control</h2>
                    <p class="text-on-surface/60">Bienvenido al sistema de administración del LMS FPC.</p>
                </div>
                <div class="flex gap-4">
                    <button class="bg-primary/10 text-primary px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                        <span class="material-symbols-outlined">download</span> Reporte Global
                    </button>
                </div>
            </header>

            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white p-8 rounded-[2rem] border border-surface-variant shadow-sm hover:shadow-md transition-all">
                    <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Total Cursos</p>
                    <div class="flex items-end justify-between">
                        <span class="text-4xl font-headline font-bold text-primary">${courses.length}</span>
                        <div class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">auto_stories</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-8 rounded-[2rem] border border-surface-variant shadow-sm hover:shadow-md transition-all">
                    <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Estudiantes</p>
                    <div class="flex items-end justify-between">
                        <span class="text-4xl font-headline font-bold text-primary">${users.length}</span>
                        <div class="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">group</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-8 rounded-[2rem] border border-surface-variant shadow-sm hover:shadow-md transition-all">
                    <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Inscripciones</p>
                    <div class="flex items-end justify-between">
                        <span class="text-4xl font-headline font-bold text-primary">124</span>
                        <div class="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">how_to_reg</span>
                        </div>
                    </div>
                </div>
                <div class="bg-white p-8 rounded-[2rem] border border-surface-variant shadow-sm hover:shadow-md transition-all">
                    <p class="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Completitud</p>
                    <div class="flex items-end justify-between">
                        <span class="text-4xl font-headline font-bold text-primary">68%</span>
                        <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                            <span class="material-symbols-outlined">analytics</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Recent Activity -->
                <div class="lg:col-span-2 bg-white rounded-[2rem] border border-surface-variant p-8 h-full">
                    <h3 class="text-xl font-bold text-primary mb-6">Actividad Reciente</h3>
                    <div class="space-y-6">
                        ${logs.length > 0 ? logs.map(log => `
                            <div class="flex items-center gap-4 border-b border-surface-variant pb-4 last:border-0 last:pb-0">
                                <div class="w-2 h-2 rounded-full bg-secondary"></div>
                                <div class="flex-1">
                                    <p class="text-sm font-medium">${log.message}</p>
                                    <p class="text-[10px] text-on-surface/40 uppercase tracking-widest mt-1">${new Date(log.date).toLocaleString()}</p>
                                </div>
                            </div>
                        `).join('') : '<p class="text-on-surface/40 text-center py-12">No hay actividad reciente.</p>'}
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-primary text-white rounded-[2rem] p-8 flex flex-col justify-between">
                    <div>
                        <h3 class="text-xl font-bold mb-2">Acciones Rápidas</h3>
                        <p class="text-white/60 text-sm mb-8">Accesos directos para la gestión inmediata.</p>
                        
                        <div class="space-y-4">
                            <a href="#/admin/cursos" class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-between transition-all group">
                                <span class="font-bold">Nuevo Curso</span>
                                <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">add_circle</span>
                            </a>
                            <a href="#/admin/usuarios" class="w-full bg-white/10 hover:bg-white/20 p-4 rounded-xl flex items-center justify-between transition-all group">
                                <span class="font-bold">Alta de Usuario</span>
                                <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">person_add</span>
                            </a>
                        </div>
                    </div>
                    
                    <div class="mt-8 pt-8 border-t border-white/10">
                        <p class="text-[10px] text-white/40 uppercase tracking-widest mb-4">Ayuda del Sistema</p>
                        <a href="#" class="text-sm font-bold flex items-center gap-2 hover:underline">
                            <span class="material-symbols-outlined text-sm">menu_book</span> Manual de Administrador
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {}
};
