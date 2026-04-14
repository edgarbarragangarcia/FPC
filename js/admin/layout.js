// Admin Layout Component
export const AdminLayout = {
    render: (content) => {
        const path = window.location.hash.slice(1) || '/admin';
        
        const menuItems = [
            { path: '/admin', label: 'Dashboard', icon: 'dashboard' },
            { path: '/admin/cursos', label: 'Cursos', icon: 'auto_stories' },
            { path: '/admin/usuarios', label: 'Usuarios', icon: 'group' },
            { path: '/admin/inscripciones', label: 'Inscripciones', icon: 'how_to_reg' },
            { path: '/admin/reportes', label: 'Reportes', icon: 'analytics' }
        ];

        return `
        <div class="flex min-h-screen bg-surface">
            <!-- Admin Sidebar -->
            <aside class="w-80 bg-white border-r border-surface-variant flex flex-col sticky top-0 h-screen">
                <div class="p-8">
                    <div class="flex flex-col mb-12">
                        <span class="font-headline font-bold text-primary text-xl tracking-tight leading-none">Admin Panel</span>
                        <span class="text-[10px] font-bold text-secondary tracking-[0.2em] uppercase mt-1">LMS Promover</span>
                    </div>

                    <nav class="space-y-2">
                        ${menuItems.map(item => `
                        <a href="#${item.path}" class="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${path === item.path ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-on-surface/60 hover:bg-surface-variant hover:text-primary'}">
                            <span class="material-symbols-outlined">${item.icon}</span>
                            <span>${item.label}</span>
                        </a>
                        `).join('')}
                    </nav>
                </div>

                <div class="mt-auto p-8 border-t border-surface-variant">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold">
                            AD
                        </div>
                        <div>
                            <p class="text-sm font-bold">Admin FPC</p>
                            <p class="text-[10px] text-on-surface/40 uppercase tracking-widest">Super Usuario</p>
                        </div>
                    </div>
                    <a href="#/" class="flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-accent hover:bg-accent/5 transition-all">
                        <span class="material-symbols-outlined">logout</span>
                        <span>Salir a App</span>
                    </a>
                </div>
            </aside>

            <!-- Main Admin Content Area -->
            <main class="flex-1 p-12 overflow-y-auto">
                ${content}
            </main>
        </div>
        `;
    }
};
