// Courses Page Component
import { DB } from '../admin/data.js';

export const Courses = {
    render: async () => {
        const dummyCourses = DB.getCourses();

        return `
        <div class="max-w-7xl mx-auto py-12">
            <header class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                <div class="space-y-4">
                    <h2 class="text-4xl md:text-5xl font-headline font-bold text-primary tracking-tight">Catálogo de Cursos</h2>
                    <p class="text-on-surface/60 max-w-xl">
                        Explora nuestra oferta educativa diseñada con los más altos estándares de accesibilidad universal.
                    </p>
                </div>
                
                <div class="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                    <button class="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap">Todos</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Tecnología</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Negocios</button>
                    <button class="bg-surface-variant/50 text-on-surface px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap hover:bg-surface-variant transition-all">Bienestar</button>
                </div>
            </header>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                ${dummyCourses.map(course => `
                <div class="group bg-white rounded-[2.5rem] border border-surface-variant overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col">
                    <div class="h-64 overflow-hidden relative">
                        <img src="${course.img}" alt="${course.title}" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
                        <div class="absolute top-4 left-4 flex gap-2">
                            <span class="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/10">${course.category}</span>
                            <span class="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">${course.level}</span>
                        </div>
                    </div>
                    
                    <div class="p-8 flex flex-col flex-1">
                        <h3 class="text-2xl font-headline font-bold text-primary mb-4 leading-snug group-hover:text-secondary transition-colors">${course.title}</h3>
                        <p class="text-sm text-on-surface/60 mb-6 flex-1">Potencia tus habilidades con este curso especializado de ${course.duration} enfocado en resultados reales.</p>
                        
                        <div class="flex items-center justify-between border-t border-surface-variant pt-6">
                            <div class="flex items-center gap-2 text-primary font-bold">
                                <span class="material-symbols-outlined text-sm">schedule</span>
                                <span class="text-sm">${course.duration}</span>
                            </div>
                            <button class="bg-surface-variant text-primary p-3 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all accessible-focus">
                                <span class="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>

            <!-- Empty state or footer in explorer -->
            <div class="mt-20 text-center p-12 bg-primary/5 rounded-[3rem] border border-dashed border-primary/20 mx-4">
                <p class="font-bold text-primary">¿No encuentras lo que buscas?</p>
                <p class="text-sm text-on-surface/60 mt-2 mb-6">Estamos agregando nuevos cursos mensualmente adaptados a tus necesidades.</p>
                <button class="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 mx-auto">
                   <span class="material-symbols-outlined">support_agent</span>
                   Solicitar una temática
                </button>
            </div>
        </div>
        `;
    },
    afterRender: async () => {}
};
