// Admin Reports Page
export const AdminReports = {
    render: async () => {
        return `
        <div class="space-y-8 animate-in fade-in duration-700 pb-12">
            <!-- Premium Header -->
            <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                <div class="absolute top-0 right-0 w-64 h-64 bg-surface/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                    <h2 class="text-4xl font-headline font-extrabold tracking-tight">Reportes y Analíticas</h2>
                    <p class="text-white/80 text-lg font-medium">Métricas integrales sobre el impacto e interacción en la plataforma.</p>
                </div>
                
                <button onclick="alert('Generando PDF...')" class="relative z-10 bg-surface/10 hover:bg-surface text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span class="material-symbols-outlined font-light text-[22px]">print</span> 
                    <span>Exportar PDF</span>
                </button>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Placeholder for Chart 1 -->
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[350px] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 group">
                    <div class="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span class="material-symbols-outlined text-5xl text-primary/40">bar_chart</span>
                    </div>
                    <p class="text-primary font-extrabold text-lg mb-2">Completitud por Categoría</p>
                    <p class="text-on-surface/40 font-bold uppercase tracking-widest text-[10px]">Gráfico en desarrollo</p>
                </div>
                
                <!-- Placeholder for Chart 2 -->
                <div class="bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[350px] flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 group">
                     <div class="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <span class="material-symbols-outlined text-5xl text-secondary/40">pie_chart</span>
                    </div>
                    <p class="text-primary font-extrabold text-lg mb-2">Estudiantes vs Instructores</p>
                    <p class="text-on-surface/40 font-bold uppercase tracking-widest text-[10px]">Gráfico en desarrollo</p>
                </div>

                <!-- Descriptive Metrics Table -->
                <div class="md:col-span-2 bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <h3 class="text-2xl font-headline font-extrabold text-primary mb-6">Métricas Destacadas del Mes</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="p-6 bg-surface/30 rounded-2xl border border-surface-variant/50">
                            <p class="text-[10px] uppercase font-black tracking-[0.2em] text-on-surface/50 mb-2">Nuevos Usuarios</p>
                            <p class="text-3xl font-extrabold text-secondary">+15%</p>
                        </div>
                        <div class="p-6 bg-surface/30 rounded-2xl border border-surface-variant/50">
                            <p class="text-[10px] uppercase font-black tracking-[0.2em] text-on-surface/50 mb-2">Abandono de Cursos</p>
                            <p class="text-3xl font-extrabold text-emerald-600">-5%</p>
                        </div>
                        <div class="p-6 bg-surface/30 rounded-2xl border border-surface-variant/50">
                            <p class="text-[10px] uppercase font-black tracking-[0.2em] text-on-surface/50 mb-2">Horas de Estudio</p>
                            <p class="text-3xl font-extrabold text-accent">340h</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
};
