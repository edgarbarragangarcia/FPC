// Mission Page Component
export const Mission = {
    render: async () => {
        return `
        <div class="max-w-7xl mx-auto py-12 px-4">
            <!-- Impact Story -->
            <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                <div class="lg:col-span-12 text-center mb-12 space-y-4">
                     <span class="inline-block px-4 py-1.5 rounded-full bg-accent text-white font-bold text-xs uppercase tracking-[0.2em]">Más de 3 Décadas de Lucha</span>
                     <h2 class="text-5xl md:text-7xl font-headline font-bold text-primary tracking-tight">El Legado de <span class="text-accent underline decoration-4 underline-offset-8">Jairo Clopatofsky</span></h2>
                </div>
                
                <div class="lg:col-span-7 space-y-8 animate-in slide-in-from-left duration-700">
                    <p class="text-3xl font-light text-on-surface/80 leading-relaxed italic border-l-8 border-secondary pl-8">
                        "Fundación Promover por Colombia nació de la necesidad de demostrar que la inclusión no es un favor, es un derecho fundamental e irrevocable."
                    </p>
                    <div class="space-y-6 text-xl text-on-surface/70 leading-relaxed font-light">
                        <p>
                            Jairo Clopatofsky Ghisays ha marcado la historia de Colombia como el primer congresista usuario de silla de ruedas. Su labor no se limitó a ocupar un curul; se enfocó en transformar el marco legal del país.
                        </p>
                        <p>
                            La fundación es la herramienta a través de la cual materializamos los logros legislativos en beneficios reales para el ciudadano. Desde la <strong>Ley 361 de 1997 (conocida como Ley Clopatofsky)</strong>, la cual fue la primera en garantizar derechos de educación y trabajo para discapacitados, hasta la labor incansable que permitió armonizar estas normas con la Ley 1618 de 2013.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8">
                        <div class="p-6 bg-surface-variant rounded-3xl">
                            <p class="text-4xl font-headline font-bold text-primary">1982</p>
                            <p class="text-xs text-on-surface/60 font-bold uppercase mt-2">Punto de Partida</p>
                            <p class="text-xs text-on-surface/50 mt-1">Accidente y decisión de transformar la realidad nacional.</p>
                        </div>
                        <div class="p-6 bg-surface-variant rounded-3xl">
                            <p class="text-4xl font-headline font-bold text-primary">2013</p>
                            <p class="text-xs text-on-surface/60 font-bold uppercase mt-2">Ley 1618</p>
                            <p class="text-xs text-on-surface/50 mt-1">Hito legislativo para la inclusión social plena.</p>
                        </div>
                        <div class="p-6 bg-surface-variant rounded-3xl">
                            <p class="text-4xl font-headline font-bold text-primary">∞ </p>
                            <p class="text-xs text-on-surface/60 font-bold uppercase mt-2">Compromiso</p>
                            <p class="text-xs text-on-surface/50 mt-1">Labor incansable por la autonomía total.</p>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 relative">
                    <div class="absolute -inset-10 bg-primary/10 rounded-full blur-[80px]"></div>
                    <div class="relative aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl skew-y-1 group">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcxKgpFkI7MRCVqhOnQtn37K5WTQ48jGHojBYcvobBpEK39YHwgZzeRePqIsqfinhZJybiZaEg9esWq2FB4rNUrTqvJjmxZ_cZLbRRnNMgUPsmQ4T1VuoDCtHaY81512FW03mC4MQdXpyiI4DJL1QkBTA2buZXNl2E8RA6_MpkKPdDJZnWnvBSnLn1jUp52G0eOS_lm7ZmQMsD6GwCe5A3Q9G_5IIlcCfG49j29VTOMqXoveIW2BGAZKmGIZa8t9YVkR9nF4a8jxT8" 
                             alt="Labor social de Jairo Clopatofsky" 
                             class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-12 translate-y-full group-hover:translate-y-0 transition-transform">
                             <p class="text-white text-lg font-bold">Uniendo a Colombia a través de la inclusión.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Detailed Impact Pillars -->
            <section class="mb-32">
                <div class="text-center mb-16 space-y-4">
                    <h2 class="text-5xl font-headline font-bold text-primary">Lo que hacemos juntos</h2>
                    <p class="text-on-surface/60 max-w-2xl mx-auto">Nuestros programas están diseñados bajo 4 ejes estratégicos que garantizan el desarrollo integral.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <!-- Education -->
                    <div class="flex gap-8 p-10 bg-white border border-surface-variant rounded-[3.5rem] hover:shadow-xl transition-all">
                        <div class="shrink-0 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-3xl">school</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-primary mb-4">LMS Promover</h3>
                            <p class="text-on-surface/70 leading-relaxed">Educación técnica especializada para potenciar la autodidáctica y la cualificación laboral en entornos digitales accesibles.</p>
                        </div>
                    </div>
                    <!-- Laboral -->
                    <div class="flex gap-8 p-10 bg-white border border-surface-variant rounded-[3.5rem] hover:shadow-xl transition-all">
                        <div class="shrink-0 w-16 h-16 bg-secondary text-white rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-3xl">handshake</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-primary mb-4">Empleabilidad</h3>
                            <p class="text-on-surface/70 leading-relaxed">Conexión con empresas líderes para cerrar la brecha laboral y fomentar la contratación inclusiva basada en talento.</p>
                        </div>
                    </div>
                    <!-- Legal -->
                    <div class="flex gap-8 p-10 bg-white border border-surface-variant rounded-[3.5rem] hover:shadow-xl transition-all">
                        <div class="shrink-0 w-16 h-16 bg-accent text-white rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-3xl">policy</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-primary mb-4">Litigio Estratégico</h3>
                            <p class="text-on-surface/70 leading-relaxed">Representamos y asesoramos a quienes ven vulnerados sus derechos, utilizando el marco legal para generar precedentes de inclusión.</p>
                        </div>
                    </div>
                    <!-- Rehab -->
                    <div class="flex gap-8 p-10 bg-white border border-surface-variant rounded-[3.5rem] hover:shadow-xl transition-all">
                        <div class="shrink-0 w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center">
                            <span class="material-symbols-outlined text-3xl">universal_accessibility</span>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-primary mb-4">Vida Independiente</h3>
                            <p class="text-on-surface/70 leading-relaxed">Talleres de autonomía, deporte adaptado y entrega de elementos de asistencia para mejorar la calidad de vida diaria.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Call to Action -->
            <section class="text-center bg-primary text-white rounded-[4rem] p-16 md:p-32 relative overflow-hidden">
                <div class="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full blur-[100px] opacity-20 -mb-32 -mr-32"></div>
                <div class="relative z-10">
                    <h2 class="text-4xl md:text-6xl font-headline font-bold mb-8">Únete a la Revolución de la Inclusión</h2>
                    <p class="text-white/80 text-2xl max-w-2xl mx-auto mb-12 leading-relaxed">Cada curso que tomas, cada certificado que obtienes, es un paso hacia una Colombia más justa.</p>
                    <div class="flex justify-center flex-wrap gap-4">
                        <a href="#/cursos" class="bg-white text-primary px-12 py-5 rounded-3xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                            Explorar Cursos LMS
                        </a>
                    </div>
                </div>
            </section>
        </div>
        `;
    },
    afterRender: async () => {}
};
