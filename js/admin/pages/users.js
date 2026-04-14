// Admin Users Management Page
import { DB } from '../data.js';

export const AdminUsers = {
    render: async () => {
        const users = DB.getUsers();

        return `
        <div class="space-y-8 animate-in fade-in duration-700 pb-12">
            <!-- Premium Header with Gradient & Glassmorphism -->
            <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                    <h2 class="text-4xl font-headline font-extrabold tracking-tight">Gestión de Usuarios</h2>
                    <p class="text-white/80 text-lg font-medium">Administra los roles y accesos de los estudiantes e instructores.</p>
                </div>
                
                <button class="relative z-10 bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span class="material-symbols-outlined font-light text-[22px]">person_add</span> 
                    <span>Nuevo Usuario</span>
                </button>
            </header>

            <!-- Data Table Container with Glassmorphism -->
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-x-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <table class="min-w-full text-left border-collapse">
                    <thead class="bg-surface/40 border-b border-surface-variant/50">
                        <tr>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Usuario</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Rol</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Email</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-variant/30">
                        ${users.map((user, index) => `
                        <tr class="hover:bg-white transition-all duration-300 group ${index % 2 === 0 ? 'bg-transparent' : 'bg-surface/10'}">
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-5">
                                    <div class="relative">
                                        <img src="${user.avatar}" class="w-12 h-12 rounded-full ring-4 ring-white shadow-sm object-cover group-hover:scale-110 transition-transform duration-300">
                                        <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-extrabold text-primary text-base group-hover:text-[#0052b4] transition-colors">${user.name}</span>
                                        <span class="text-xs text-on-surface/40 font-medium">ID: #${user.id.toString().padStart(4, '0')}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border ${
                                    user.role === 'admin' 
                                    ? 'bg-red-50 text-red-600 border-red-200 shadow-sm shadow-red-100/50' 
                                    : 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-sm shadow-emerald-100/50'
                                }">
                                    ${user.role}
                                </span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-2 text-on-surface/60 text-sm font-medium">
                                    <span class="material-symbols-outlined text-base opacity-50">mail</span>
                                    ${user.email}
                                </div>
                            </td>
                            <td class="px-8 py-6 text-right">
                                <div class="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <button class="p-2.5 bg-surface hover:bg-primary hover:text-white text-primary rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" title="Editar">
                                        <span class="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                    <button class="p-2.5 bg-surface hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" title="Eliminar">
                                        <span class="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        `;
    },
    afterRender: async () => {}
};
