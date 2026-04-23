// Home Page Component
export const Home = {
    render: async () => {
        return `
        <div class="max-w-7xl mx-auto px-4">
            <!-- Hero Section: The Spark of a Mission -->
            <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center pt-4 md:pt-0 pb-12 md:pb-24 animate-in fade-in duration-1000">
                <!-- Column 1: Image (Appears first on mobile) -->
                <div class="relative lg:-mt-20 order-1 lg:order-2">
                    <div class="absolute -inset-10 bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
                    <div class="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                        <img src="https://www.saldarriagaconcha.org/wp-content/uploads/2020/02/Jairo-Clopatofsky-Consejero-de-la-Participacio%CC%81n-de-las-Personas-con-Discapacidad.jpg" 
                             alt="Retrato de Jairo Clopatofsky" 
                             class="w-full h-full object-cover">
                    </div>
                    <!-- Impact Floating Badge -->
                    <div class="absolute -bottom-6 -left-4 lg:-bottom-8 lg:-left-8 bg-surface p-6 lg:p-8 rounded-3xl shadow-2xl border border-surface-variant max-w-[240px] lg:max-w-[280px] animate-bounce-slow">
                        <p data-i18n="hero_badge_tag" class="text-[10px] lg:text-xs font-bold text-secondary uppercase tracking-widest mb-2">Hito Legislativo</p>
                        <p data-i18n="hero_badge_desc" class="text-xs lg:text-sm font-medium text-on-surface leading-snug">Autor de la <strong>Ley 361 de 1997</strong> (Ley Clopatofsky), base de la inclusión en Colombia.</p>
                    </div>
                </div>

                <!-- Column 2: Text Content -->
                <div class="space-y-8 order-2 lg:order-1">
                    <div data-i18n="hero_tag" class="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest">
                        Desde 1982 transformando vidas
                    </div>
                    <h1 data-i18n="hero_title" class="text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-primary leading-[1.05] tracking-tight">
                        Donde la <span class="text-secondary italic">voluntad</span> rompe toda barrera.
                    </h1>
                    <p data-i18n="hero_desc" class="text-xl md:text-2xl text-on-surface/70 leading-relaxed max-w-2xl font-light">
                        Fundación Promover por Colombia, liderada por el Senador <strong>Jairo Clopatofsky</strong>, es el motor de la inclusión real para la población con discapacidad en el país.
                    </p>
                    <div class="flex flex-wrap gap-4 pt-4">
                        <a href="#/cursos" data-i18n="hero_btn_lms" class="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all accessible-focus flex items-center gap-3">
                            Ingresar al LMS
                            <span class="material-symbols-outlined">school</span>
                        </a>
                        <a href="#/impacto" data-i18n="hero_btn_mission" class="bg-surface border border-surface-variant text-on-surface px-10 py-5 rounded-2xl font-bold text-lg hover:bg-surface-variant transition-all accessible-focus">
                            Conoce Nuestra Labor
                        </a>
                    </div>
                </div>
            </section>

            <!-- ¿Qué hace la Fundación? 4 Pilares -->
            <section class="py-12 md:py-24 bg-surface rounded-[2.5rem] md:rounded-[4rem] px-6 md:px-16 border border-surface-variant mb-16 md:mb-32">
                <div class="max-w-4xl mb-12 md:mb-20">
                    <h2 data-i18n="pillars_title" class="text-3xl md:text-6xl font-headline font-bold text-primary mb-6">Nuestra Labor Social</h2>
                    <p data-i18n="pillars_desc" class="text-lg md:text-xl text-on-surface/60 leading-relaxed">No solo formamos personas; transformamos el ecosistema social y legal de Colombia para asegurar que la discapacidad jamás sea sinónimo de exclusión.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Pillar 1 -->
                    <div class="space-y-6 group">
                        <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white">
                            <span class="material-symbols-outlined text-3xl">auto_stories</span>
                        </div>
                        <h3 data-i18n="pillar1_title" class="text-2xl font-bold text-primary">Educación Inclusiva</h3>
                        <p data-i18n="pillar1_desc" class="text-on-surface/70 leading-relaxed">Programas de formación técnica y digital adaptados a cada necesidad específica, permitiendo el aprendizaje autónomo.</p>
                    </div>
                    <!-- Pillar 2 -->
                    <div class="space-y-6 group">
                        <div class="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center transition-all group-hover:bg-secondary group-hover:text-white">
                            <span class="material-symbols-outlined text-3xl">work</span>
                        </div>
                        <h3 data-i18n="pillar2_title" class="text-2xl font-bold text-primary">Inclusión Laboral</h3>
                        <p data-i18n="pillar2_desc" class="text-on-surface/70 leading-relaxed">Puentes efectivos entre el talento cualificado y el sector privado, fomentando entornos de trabajo diversos.</p>
                    </div>
                    <!-- Pillar 3 -->
                    <div class="space-y-6 group">
                        <div class="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center transition-all group-hover:bg-accent group-hover:text-white">
                            <span class="material-symbols-outlined text-3xl">gavel</span>
                        </div>
                        <h3 data-i18n="pillar3_title" class="text-2xl font-bold text-primary">Asesoría Jurídica</h3>
                        <p data-i18n="pillar3_desc" class="text-on-surface/70 leading-relaxed">Defensa proactiva de los derechos de la población vulnerable, asegurando el cumplimiento de las leyes de apoyo social.</p>
                    </div>
                    <!-- Pillar 4 -->
                    <div class="space-y-6 group">
                        <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:text-white">
                            <span class="material-symbols-outlined text-3xl">sports_basketball</span>
                        </div>
                        <h3 data-i18n="pillar4_title" class="text-2xl font-bold text-primary">Deporte y Vida</h3>
                        <p data-i18n="pillar4_desc" class="text-on-surface/70 leading-relaxed">El deporte adaptado como herramienta de salud mental, disciplina y superación personal constante.</p>
                    </div>
                </div>
            </section>

            <!-- Biography Section: Jairo Clopatofsky -->
            <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center mb-16 md:mb-32">
                <div class="lg:col-span-5 order-2 lg:order-1">
                    <div class="relative scale-95 hover:scale-100 transition-transform duration-500">
                        <div class="absolute inset-0 bg-primary rounded-[4rem] transform -rotate-3 overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                                 alt="Retrato formal Jairo Clopatofsky" 
                                 class="w-full h-full object-cover opacity-60 mix-blend-luminosity">
                        </div>
                        <div class="relative bg-surface/10 backdrop-blur-sm border border-white/20 p-12 rounded-[4rem] text-white">
                            <p data-i18n="bio_tag" class="text-sm font-bold uppercase tracking-[0.3em] mb-4 opacity-70">El Fundador</p>
                            <h3 data-i18n="bio_name" class="text-4xl font-headline font-bold mb-6">Jairo Clopatofsky Ghisays</h3>
                            <p data-i18n="bio_quote" class="text-lg leading-relaxed mb-8 font-light italic opacity-90">
                                "Mi vida cambió en un segundo, pero mi propósito se fortaleció para siempre. No descansaremos hasta que Colombia sea ejemplo mundial de accesibilidad."
                            </p>
                            <div class="flex gap-4">
                                <div class="bg-surface/20 p-4 rounded-2xl text-center flex-1">
                                    <p class="text-2xl font-bold">1ro</p>
                                    <p data-i18n="bio_stat1" class="text-[10px] uppercase">Congresista en silla de ruedas</p>
                                </div>
                                <div class="bg-surface/20 p-4 rounded-2xl text-center flex-1">
                                    <p class="text-2xl font-bold">+30</p>
                                    <p data-i18n="bio_stat2" class="text-[10px] uppercase">Años de Liderazgo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="lg:col-span-7 order-1 lg:order-2 space-y-8">
                    <h2 data-i18n="bio_title" class="text-3xl md:text-6xl font-headline font-bold text-primary">Transformando los desafíos en Legado.</h2>
                    <div class="space-y-6 text-lg md:text-xl text-on-surface/70 leading-relaxed font-light">
                        <p data-i18n="bio_p1">Tras un accidente automovilístico en 1982 que lo dejó con una discapacidad física permanente, Jairo tomó una decisión: su voz sería la de millones que no eran escuchados.</p>
                        <p data-i18n="bio_p2">Logró ser el primer congresista en la historia del país en sesionar desde una silla de ruedas, abriendo el camino físico e institucional para la inclusión. Como Senador y Alto Consejero, ha legislado por la eliminación de barreras y la creación de oportunidades equitativas en todo el territorio nacional.</p>
                        <p data-i18n="bio_p3">Fundación Promover por Colombia es la culminación de este esfuerzo, permitiendo que la educación sea el primer paso hacia la libertad de pensamiento y acción.</p>
                    </div>
                    <a href="#/impacto" data-i18n="bio_link" class="inline-flex items-center gap-2 font-bold text-primary hover:text-secondary transition-colors text-xl">
                        Ver historia completa <span class="material-symbols-outlined">north_east</span>
                    </a>
                </div>
            </section>

            <!-- News & Impact Section -->
            <section class="py-12 md:py-24 border-t border-surface-variant/30">
                <div class="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div class="space-y-4 text-center md:text-left">
                        <div data-i18n="news_tag" class="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Impacto y Actualidad
                        </div>
                        <h2 data-i18n="news_title" class="text-3xl md:text-5xl font-headline font-bold text-primary tracking-tight">Nuestra labor en video</h2>
                        <p data-i18n="news_desc" class="text-on-surface/60 max-w-xl">
                            Sigue de cerca cómo transformamos realidades a través de la inclusión y la educación accesible en toda Colombia.
                        </p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-surface-variant/30 p-8 md:p-12 rounded-[3.5rem] border border-surface-variant shadow-sm">
                    <div class="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-surface-variant flex-shrink-0">
                        <iframe 
                            src="https://www.youtube.com/embed/rGamVF_p9OU" 
                            class="absolute inset-0 w-full h-full border-none"
                            title="Video institucional Fundación Promover"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="space-y-6">
                        <div data-i18n="video_tag" class="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-widest">
                            Entrevista KienyKe
                        </div>
                        <h3 data-i18n="video_title" class="text-2xl md:text-4xl font-headline font-bold text-primary leading-tight">El futuro es inclusivo o no será</h3>
                        <div class="space-y-4 text-base md:text-lg text-on-surface/70 leading-relaxed font-light">
                            <p data-i18n="video_p1">En esta conversación profunda, el fundador <strong>Jairo Clopatofsky</strong> detalla los próximos pasos del Movimiento Promover Colombia.</p>
                            <p data-i18n="video_p2">Descubre cómo nuestra filosofía de <em>autonomía</em> y <em>educación técnica adaptada</em> se está integrando en las políticas públicas para garantizar que el conocimiento y el trabajo no tengan barreras de entrada para nadie.</p>
                        </div>
                        <div class="pt-2 flex items-center gap-3">
                            <div class="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-primary">
                                <span class="material-symbols-outlined">play_circle</span>
                            </div>
                            <p data-i18n="video_cta" class="font-bold text-sm text-primary tracking-wide">Analice nuestra visión (5 Min)</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        `;
    },
    afterRender: async () => {
        if (window.state.lscEnabled) {
            window.dispatchEvent(new CustomEvent('lsc-video-update', {
                detail: 'https://www.youtube.com/embed/videoseries?list=PLfVvntL9D5fREh-pYofTirX-xWAb-XWp2'
            }));
        }
    }
};
