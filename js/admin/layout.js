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
        <div class="flex flex-col lg:flex-row min-h-screen bg-surface">
            <!-- Mobile Admin Header -->
            <header class="lg:hidden bg-white border-b border-surface-variant p-4 flex justify-between items-center sticky top-0 z-[110]">
                <div class="flex flex-col">
                    <span class="font-headline font-bold text-primary text-sm leading-none">Admin Panel</span>
                    <span class="text-[8px] font-bold text-secondary uppercase tracking-[0.2em] mt-0.5">LMS Promover</span>
                </div>
                <button id="toggle-admin-menu" class="p-2 hover:bg-surface-variant rounded-full">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </header>

            <!-- Admin Sidebar (Responsive Drawer) -->
            <aside id="admin-sidebar" class="fixed inset-y-0 left-0 z-[120] w-80 bg-white border-r border-surface-variant flex flex-col transform -translate-x-full lg:translate-x-0 lg:static transition-transform duration-300">
                <div class="p-8">
                    <div class="hidden lg:flex flex-col mb-12">
                        <span class="font-headline font-bold text-primary text-xl tracking-tight leading-none">Admin Panel</span>
                        <span class="text-[10px] font-bold text-secondary tracking-[0.2em] uppercase mt-1">LMS Promover</span>
                    </div>

                    <nav class="space-y-2">
                        ${menuItems.map(item => `
                        <a href="#${item.path}" class="admin-nav-link flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${path === item.path ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-on-surface/60 hover:bg-surface-variant hover:text-primary'}">
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

            <!-- Backdrop for Mobile Admin Sidebar -->
            <div id="admin-sidebar-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[115] hidden lg:hidden opacity-0 transition-opacity duration-300"></div>

            <!-- Main Admin Content Area -->
            <main class="flex-1 p-6 lg:p-12 overflow-y-auto">
                ${content}
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        const toggleBtn = document.getElementById('toggle-admin-menu');
        const sidebar = document.getElementById('admin-sidebar');
        const backdrop = document.getElementById('admin-sidebar-backdrop');
        const links = document.querySelectorAll('.admin-nav-link');

        if (toggleBtn) {
            const openSidebar = () => {
                backdrop.classList.remove('hidden');
                setTimeout(() => {
                    backdrop.classList.replace('opacity-0', 'opacity-100');
                    sidebar.classList.replace('-translate-x-full', 'translate-x-0');
                }, 10);
            };

            const closeSidebar = () => {
                backdrop.classList.replace('opacity-100', 'opacity-0');
                sidebar.classList.replace('translate-x-0', '-translate-x-full');
                setTimeout(() => {
                    backdrop.classList.add('hidden');
                }, 300);
            };

            toggleBtn.onclick = openSidebar;
            backdrop.onclick = closeSidebar;
            links.forEach(l => l.onclick = closeSidebar);
        }
    }
};
