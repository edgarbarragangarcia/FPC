// Courses Page Component
export const Courses = {
    render: async () => {
        const dummyCourses = [
            { id: 1, title: 'Liderazgo Empático', level: 'Accesibilidad AAA', duration: '12h', category: 'Laboral', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTJH8dbnMCwZe3P5hXyrvwXTglZkdnH3Xv_WEb-Z-J78s4WfRPq9ECpTLFBqO6hBclnn6LVzDqJOEQHeXGkcu978LySNe8ARN-p2Avf2LlxjtEA8lT-qhQaxvadE3IUKG5AINm-RPwwGTBYEKq0Rk-FcsbC3ZyUQ-9mbntNAmL6DlL4Hq8vElxvOfm0KuGGjL-P0nIkOgSK43CXVh96lewEHl_x6KbilKk1lVapVS9ZiBsNv1v0wbzK8Zfcf2fByS9UcDjy0DeE2L' },
            { id: 2, title: 'Introducción al Braille Digital', level: 'Visual Focus', duration: '20h', category: 'Tecnología', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZNvaOh3E9Ond6UnB7yMU84nt6E0BXVuBAHSN1CK710aBie79qf1a9Vm4b_nz86hQmrrNK3KqqYU20UTpyOxA9kfWrvbidFSsRDA0V62F3aELe_Lr5_pHoPiGFN3KAnH_um2mf2Cmpf7icVX831g_o1YevXmqqOV5dk9dOb1w9uySAEQSN7qNYeTEWFAMmtVw3PiRHh7ebN9aiwCC6mWBXtWAwSmhHHI8z4LEwFxPv58YjgujBB-S22d8A8rxlO0jCZrOEFhaHMn8' },
            { id: 3, title: 'Emprendimiento Inclusivo', level: 'Cognitivo Adaptado', duration: '15h', category: 'Negocios', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCicB8UDykP_ofYUn7VxMkqrz3Ml6P_R7D54GE5VyI7XjxP1QMzTvECnnL9-N5APo3383NGUZmDT-0BWcp6g1VtLS1-AHteLHyOhFr1rri-XMW9P-lwJxFhK5vaDFmc3G0co0dwO8rpnNGKCjQPez15XyvXdNA-RNhnaX5SHFYca3B3_hmTi4pkPs_3mcGHsfHBlmMPg9BDeTJ98xEHnj5yUlj0Xr--Xy4YKWOselGzajSNp4MEqwG4Ic7OrcCS52lop-ZjyO2Gey9b' },
            { id: 4, title: 'Diseño para Todos (Discapacidad)', level: 'Accesibilidad AAA', duration: '8h', category: 'Diseño', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAXr5jMsNNJfYFIrwvjkbsNzhaUNf03lC3nVFsm6QdKvRR5UX-lVKa8Y1j8bUh4XZL64v3SqhUXjefTsduipYlTknkV8dmZEmHaP-l71AjjP98bbpQEyOZgOCLpv1BWNBoQ6J2Vs9RdsvC3cJwo3Ab4sHcp88k17OXPG2DHEWnJRMxUSwaWGFjkhwfpmWYSWmZct2zNcMA8ICnwOmbTmlQ8cmFzxPACSUt6rDCjLKZ-j7lVk54H0iW5LlLQYCdPrqIXCPtU3cTHmbH' }
        ];

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
