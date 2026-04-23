// Course Player Page Component
import { DB } from '../admin/data.js';

export const CoursePlayer = {
    render: async () => {
        const hash = window.location.hash;
        const courseId = hash.split('id=')[1];
        
        if (!courseId) {
            window.location.hash = '#/dashboard';
            return '';
        }

        const course = DB.getCourses().find(c => c.id == courseId);
        if (!course) return '<div class="p-12 text-center">Curso no encontrado</div>';

        // Fetch modules and lessons
        const modules = await DB.fetchCourseContent(courseId);

        return `
        <div class="course-player-layout">
            <!-- ============================================= -->
            <!-- SIDEBAR: Static, fixed, independent column    -->
            <!-- Never scrolls. Lesson list scrolls internally -->
            <!-- ============================================= -->
            <aside class="course-sidebar">
                <!-- Fixed Header -->
                <div class="shrink-0 p-6 bg-primary text-white">
                    <div class="flex items-center gap-3 mb-3">
                        <a href="#/dashboard" class="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-all accessible-focus" title="Volver al panel">
                            <span class="material-symbols-outlined text-sm">arrow_back</span>
                        </a>
                        <span class="text-[9px] font-black uppercase tracking-[0.25em] opacity-60">Currículo del curso</span>
                    </div>
                    <h2 class="text-base font-headline font-bold leading-tight drop-shadow-sm">${course.title}</h2>
                </div>

                <!-- Lesson List: Only this part scrolls inside the sidebar -->
                <div class="course-sidebar-lessons">
                    <div class="divide-y divide-surface-variant/30">
                        ${modules.map((mod, mi) => `
                            <div class="module-group">
                                <div class="px-6 py-4 bg-surface-variant/20 flex items-center gap-3 sticky top-0 z-10 backdrop-blur-sm">
                                    <span class="w-6 h-6 bg-secondary text-white rounded-md flex items-center justify-center text-[10px] font-black shrink-0">${mi + 1}</span>
                                    <span class="font-bold text-sm text-primary">${mod.title}</span>
                                </div>
                                <div class="divide-y divide-surface-variant/10">
                                    ${(mod.lessons || []).map(lesson => `
                                        <button 
                                            class="lesson-btn w-full text-left px-8 py-4 hover:bg-primary/5 transition-all flex items-center justify-between group"
                                            data-lesson-id="${lesson.id}"
                                            onclick="window.loadLesson('${lesson.id}', '${lesson.content_type}', '${lesson.content || ''}', \`${lesson.title}\`, \`${lesson.content || ''}\`, \`${lesson.transcript || ''}\`)"
                                        >
                                            <div class="flex items-center gap-4">
                                                <span class="material-symbols-outlined text-lg text-on-surface/30 group-hover:text-primary transition-colors">
                                                    ${lesson.content_type === 'video' ? 'play_circle' : lesson.content_type === 'pdf' ? 'picture_as_pdf' : 'article'}
                                                </span>
                                                <span class="text-sm font-medium text-on-surface/70 group-hover:text-primary transition-colors">${lesson.title}</span>
                                            </div>
                                            <span class="material-symbols-outlined text-sm text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">check_circle</span>
                                        </button>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </aside>

            <!-- ============================================= -->
            <!-- CONTENT: Scrollable column, independent       -->
            <!-- Scrolls vertically. Sidebar stays fixed.      -->
            <!-- ============================================= -->
            <main id="lesson-scroll-container" class="course-content">
                <div class="max-w-4xl mx-auto space-y-8 pb-24">
                    <!-- Placeholder / Welcome -->
                    <div id="lesson-viewport" class="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div class="bg-surface rounded-3xl p-12 text-center border border-surface-variant shadow-sm aspect-video flex flex-col items-center justify-center">
                            <div class="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                                <span class="material-symbols-outlined text-6xl text-primary/30">auto_awesome</span>
                            </div>
                            <h3 class="text-2xl font-headline font-bold text-primary mb-2">¡Bienvenido al Aula Virtual!</h3>
                            <p class="text-on-surface/40 max-w-sm mx-auto">Selecciona una lección del menú lateral para comenzar tu aprendizaje inclusivo.</p>
                        </div>
                    </div>

                    <!-- Lesson Actions & Meta -->
                    <div id="lesson-meta" class="hidden space-y-6">
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 id="active-lesson-title" class="text-3xl font-headline font-bold text-primary mb-1">Cargando lección...</h1>
                                <p class="text-sm font-bold text-secondary flex items-center gap-2">
                                    <span class="material-symbols-outlined text-lg">verified</span>
                                    Contenido Accesible Certificado
                                </p>
                            </div>
                            <div class="flex gap-3">
                                <button id="btn-read-aloud" class="bg-secondary/10 text-secondary px-6 py-3.5 rounded-2xl font-bold flex items-center gap-3 hover:bg-secondary hover:text-white transition-all shadow-md border-2 border-secondary/20 active:scale-95">
                                    <span class="material-symbols-outlined">volume_up</span>
                                    Lectura por voz
                                </button>
                                <button onclick="window.markLessonComplete()" class="bg-emerald-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                                    <span class="material-symbols-outlined">check_circle</span>
                                    Marcar como finalizado
                                </button>
                            </div>
                        </div>
                        <div id="active-lesson-content" class="bg-surface p-8 lg:p-12 rounded-[2.5rem] border border-surface-variant shadow-sm text-lg leading-relaxed text-on-surface/80">
                            <!-- Text content injected here -->
                        </div>
                    </div>
                </div>
            </main>
        </div>
        `;
    },
    afterRender: async () => {
        let currentTranscript = '';
        let isReading = false;
        
        // Reusable: bind TTS to whichever btn-read-aloud exists in the DOM
        const bindReadAloudBtn = () => {
            const readBtn = document.getElementById('btn-read-aloud');
            if (!readBtn) return;

            readBtn.onclick = () => {
                if (isReading) {
                    window.speechSynthesis.cancel();
                    isReading = false;
                    readBtn.innerHTML = '<span class="material-symbols-outlined">volume_up</span>Lectura por voz';
                    readBtn.classList.replace('bg-secondary', 'bg-secondary/10');
                    readBtn.classList.replace('text-white', 'text-secondary');
                } else {
                    if (!currentTranscript) return;
                    const utterance = new SpeechSynthesisUtterance(currentTranscript.replace(/<[^>]*>/g, ''));
                    utterance.lang = 'es-CO';
                    utterance.rate = 0.9;
                    
                    utterance.onend = () => {
                        isReading = false;
                        readBtn.innerHTML = '<span class="material-symbols-outlined">volume_up</span>Lectura por voz';
                        readBtn.classList.replace('bg-secondary', 'bg-secondary/10');
                        readBtn.classList.replace('text-white', 'text-secondary');
                    };
                    
                    window.speechSynthesis.speak(utterance);
                    isReading = true;
                    readBtn.innerHTML = '<span class="material-symbols-outlined">stop_circle</span>Detener lectura';
                    readBtn.classList.replace('bg-secondary/10', 'bg-secondary');
                    readBtn.classList.replace('text-secondary', 'text-white');
                }
            };
        };

        window.loadLesson = (id, type, url, title, text, transcript) => {
            const viewport = document.getElementById('lesson-viewport');
            const meta = document.getElementById('lesson-meta');
            const titleEl = document.getElementById('active-lesson-title');
            const contentEl = document.getElementById('active-lesson-content');
            
            // Set transcript for TTS — fallback to text content, then to lesson title
            currentTranscript = transcript || (type === 'text' ? text : '') || title || '';
            if (window.speechSynthesis) window.speechSynthesis.cancel();
            isReading = false;

            // Update LSC if enabled
            const lesson = DB.getCourses().flatMap(c => c.content || []).flatMap(m => m.lessons || []).find(l => l.id == id);
            if (lesson && lesson.lsc_video_url) {
                window.dispatchEvent(new CustomEvent('lsc-video-update', { detail: lesson.lsc_video_url }));
            }

            if (type === 'video') {
                let embedUrl = url;
                if (url.includes('youtube.com/watch?v=')) {
                    embedUrl = url.replace('watch?v=', 'embed/');
                } else if (url.includes('youtu.be/')) {
                    embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
                }

                viewport.innerHTML = `
                    <div class="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                        <iframe 
                            src="${embedUrl}" 
                            class="w-full h-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                `;
                // Show meta section with title + buttons below
                meta.classList.remove('hidden');
                titleEl.innerText = title;
                contentEl.classList.add('hidden');

                // Update TTS button state
                const readBtn = document.getElementById('btn-read-aloud');
                if (readBtn) {
                    if (!currentTranscript) {
                        readBtn.classList.add('opacity-40', 'cursor-not-allowed');
                    } else {
                        readBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                    }
                }
                bindReadAloudBtn();

            } else if (type === 'pdf') {
                // PDF: buttons are embedded directly next to the viewer
                meta.classList.add('hidden');  // Hide the default meta section

                viewport.innerHTML = `
                    <div class="space-y-4">
                        <!-- Title + Action Bar -->
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 class="text-2xl font-headline font-bold text-primary mb-1">${title}</h1>
                                <p class="text-sm font-bold text-secondary flex items-center gap-2">
                                    <span class="material-symbols-outlined text-lg">verified</span>
                                    Contenido Accesible Certificado
                                </p>
                            </div>
                            <div class="flex gap-3 flex-wrap">
                                <button id="btn-read-aloud" class="bg-secondary/10 text-secondary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary hover:text-white transition-all shadow-md border-2 border-secondary/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg animate-spin">sync</span>
                                    Extrayendo texto...
                                </button>
                                <a href="${url}" target="_blank" class="bg-primary/10 text-primary px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary hover:text-white transition-all shadow-md border-2 border-primary/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg">download</span>
                                    Descargar PDF
                                </a>
                                <button onclick="window.markLessonComplete()" class="bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg">check_circle</span>
                                    Finalizado
                                </button>
                            </div>
                        </div>

                        <!-- PDF Viewer -->
                        <div class="w-full h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-surface-variant bg-white">
                            <iframe 
                                src="${url}" 
                                class="w-full h-full border-none"
                                title="Documento PDF">
                            </iframe>
                        </div>
                    </div>
                `;

                // Extract text from PDF using PDF.js
                const extractPdfText = async (pdfUrl) => {
                    if (!window.pdfjsLib) {
                        console.warn('PDF.js not loaded');
                        return null;
                    }
                    try {
                        // Fetch the PDF as binary data to avoid CORS issues with PDF.js URL loading
                        const response = await fetch(pdfUrl);
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const arrayBuffer = await response.arrayBuffer();
                        
                        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                        let fullText = '';
                        for (let i = 1; i <= pdf.numPages; i++) {
                            const page = await pdf.getPage(i);
                            const content = await page.getTextContent();
                            const pageText = content.items.map(item => item.str).join(' ');
                            fullText += pageText + '\n\n';
                        }
                        return fullText.trim() || null;
                    } catch (err) {
                        console.warn('PDF text extraction failed:', err);
                        return null;
                    }
                };

                extractPdfText(url).then(pdfText => {
                    const readBtn = document.getElementById('btn-read-aloud');
                    if (pdfText) {
                        currentTranscript = pdfText;
                        if (readBtn) {
                            readBtn.innerHTML = '<span class="material-symbols-outlined text-lg">volume_up</span>Lectura por voz';
                            readBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                        }
                    } else {
                        currentTranscript = '';
                        if (readBtn) {
                            readBtn.innerHTML = '<span class="material-symbols-outlined text-lg">volume_off</span>No disponible';
                            readBtn.classList.add('opacity-40', 'cursor-not-allowed');
                        }
                    }
                    bindReadAloudBtn();
                });


            } else {
                viewport.innerHTML = `
                    <div class="bg-surface rounded-3xl p-12 text-center border border-surface-variant shadow-sm aspect-video flex flex-col items-center justify-center">
                        <span class="material-symbols-outlined text-6xl text-on-surface/10 mb-4 font-light">article</span>
                        <p class="text-on-surface/40">Lectura de lección activada</p>
                    </div>
                `;
                meta.classList.remove('hidden');
                titleEl.innerText = title;
                contentEl.classList.remove('hidden');
                contentEl.innerHTML = text || 'Sin contenido de texto.';

                // Update TTS button state
                const readBtn = document.getElementById('btn-read-aloud');
                if (readBtn) {
                    if (!currentTranscript) {
                        readBtn.classList.add('opacity-40', 'cursor-not-allowed');
                    } else {
                        readBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                    }
                }
                bindReadAloudBtn();
            }

            // Sync Nav UI
            document.querySelectorAll('.lesson-btn').forEach(btn => {
                btn.classList.remove('bg-primary/10', 'border-l-4', 'border-primary');
                if (btn.dataset.lessonId == id) {
                    btn.classList.add('bg-primary/10', 'border-l-4', 'border-primary');
                }
            });

            const scrollContainer = document.getElementById('lesson-scroll-container');
            if (scrollContainer) scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
        };

        // Initial bind for the static buttons
        bindReadAloudBtn();

        window.markLessonComplete = () => {
            UI.alert('¡Excelente trabajo!', 'Has completado esta lección. Sigue así para obtener tu certificado.', 'success');
        };
    }
};
