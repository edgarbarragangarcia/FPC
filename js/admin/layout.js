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
        <div class="flex flex-col lg:flex-row h-screen bg-surface overflow-hidden">
            <!-- Mobile Admin Header -->
            <header class="lg:hidden bg-white/90 backdrop-blur-md border-b border-surface-variant p-4 flex justify-between items-center z-[110] shrink-0">
                <div class="flex flex-col">
                    <span class="font-headline font-extrabold text-primary text-lg leading-none">Admin Panel</span>
                    <span class="text-[9px] font-bold text-secondary uppercase tracking-[0.2em] mt-1">LMS Promover</span>
                </div>
                <button id="toggle-admin-menu" class="p-2 hover:bg-surface-variant rounded-full text-primary transition-colors">
                    <span class="material-symbols-outlined">menu</span>
                </button>
            </header>

            <!-- Admin Sidebar (Responsive Drawer) -->
            <aside id="admin-sidebar" class="fixed inset-y-0 left-0 z-[120] w-72 bg-white/95 backdrop-blur-2xl border-r border-surface-variant/50 flex flex-col transform -translate-x-full lg:translate-x-0 lg:static transition-transform duration-300 lg:h-screen lg:shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div class="flex-1 p-8 overflow-y-auto">
                    <div class="hidden lg:flex flex-col mb-12">
                        <span class="font-headline font-black text-primary text-2xl tracking-tight leading-none drop-shadow-sm">Admin Panel</span>
                        <span class="text-[10px] font-black text-secondary tracking-[0.25em] uppercase mt-2">LMS Promover</span>
                    </div>

                    <nav class="space-y-3">
                        ${menuItems.map(item => `
                        <a href="#${item.path}" class="admin-nav-link group flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-300 ${path === item.path ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]' : 'text-on-surface/50 hover:bg-surface/80 hover:text-primary hover:scale-[1.02]'}">
                            <span class="material-symbols-outlined text-[22px] transition-transform duration-300 ${path === item.path ? '' : 'group-hover:scale-110'}">${item.icon}</span>
                            <span class="tracking-wide">${item.label}</span>
                        </a>
                        `).join('')}
                    </nav>
                </div>

                <div class="p-6 border-t border-surface-variant/40 shrink-0 bg-white/50">
                    <div class="flex items-center gap-4 mb-6 px-2">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-white flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-105 transition-transform">
                            AD
                        </div>
                        <div class="flex flex-col">
                            <p class="text-sm font-extrabold text-primary leading-tight">Admin FPC</p>
                            <p class="text-[9px] text-on-surface/50 uppercase font-bold tracking-[0.2em] mt-1">Super Usuario</p>
                        </div>
                    </div>
                    <a href="#/" class="flex items-center justify-center gap-3 w-full py-3.5 rounded-2xl font-bold text-accent bg-accent/5 hover:bg-accent hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                        <span class="material-symbols-outlined text-[20px]">logout</span>
                        <span class="tracking-wide">Salir a App</span>
                    </a>
                </div>
            </aside>

            <!-- Backdrop for Mobile Admin Sidebar -->
            <div id="admin-sidebar-backdrop" class="fixed inset-0 bg-primary/20 backdrop-blur-sm z-[115] hidden lg:hidden opacity-0 transition-opacity duration-300"></div>

            <!-- Main Admin Content Area -->
            <main class="flex-1 p-6 lg:p-12 overflow-y-auto scroll-smooth relative">
                <div class="max-w-7xl mx-auto pb-12">
                    ${content}
                </div>
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
