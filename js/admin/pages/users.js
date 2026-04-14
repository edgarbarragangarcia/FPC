// Admin Users Management Page
import { DB } from '../data.js';

export const AdminUsers = {
    render: async () => {
        const users = DB.getUsers();

        return `
        <div class="space-y-8 animate-in fade-in duration-500 pb-12">
            <header class="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-surface-variant">
                <div>
                    <h2 class="text-3xl font-headline font-bold text-primary">Gestión de Usuarios</h2>
                    <p class="text-on-surface/60">Administra los roles y accesos de los estudiantes e instructores.</p>
                </div>
                <button class="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                    <span class="material-symbols-outlined">person_add</span> Nuevo Usuario
                </button>
            </header>

            <div class="bg-white rounded-[2rem] border border-surface-variant overflow-hidden shadow-sm">
                <table class="w-full text-left">
                    <thead class="bg-surface-variant/30 border-b border-surface-variant">
                        <tr>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Usuario</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Rol</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Email</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-variant">
                        ${users.map(user => `
                        <tr class="hover:bg-surface/50 transition-colors group">
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-4">
                                    <img src="${user.avatar}" class="w-10 h-10 rounded-full border border-surface-variant">
                                    <span class="font-bold text-primary">${user.name}</span>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === 'admin' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'}">
                                    ${user.role}
                                </span>
                            </td>
                            <td class="px-8 py-6 text-on-surface/60 text-sm">
                                ${user.email}
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex gap-2">
                                    <button class="p-2 hover:bg-surface-variant rounded-lg transition-all">
                                        <span class="material-symbols-outlined text-xl">edit</span>
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
