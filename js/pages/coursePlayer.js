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
                                <button onclick="window.toggleModule(${mi})" class="w-full px-6 py-4 bg-surface-variant/20 hover:bg-surface-variant/40 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm transition-colors border-y border-surface-variant/50 group">
                                    <div class="flex items-center gap-3">
                                        <span class="w-6 h-6 bg-secondary text-white rounded-md flex items-center justify-center text-[10px] font-black shrink-0">${mi + 1}</span>
                                        <span class="font-bold text-sm text-primary text-left group-hover:text-[#0052b4] transition-colors">${mod.title}</span>
                                    </div>
                                    <span id="mod-icon-${mi}" class="material-symbols-outlined text-primary transition-transform duration-300 ${mi === 0 ? 'rotate-180' : ''}">expand_more</span>
                                </button>
                                <div id="mod-content-${mi}" class="divide-y divide-surface-variant/10 ${mi === 0 ? '' : 'hidden'}">
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
            <main id="lesson-scroll-container" class="course-content relative">
                <div class="sticky top-0 z-40 mb-6 flex items-center gap-3 bg-surface/80 backdrop-blur-md p-3 rounded-2xl border border-surface-variant w-max shadow-sm">
                    <button onclick="window.toggleCourseSidebar()" id="sidebar-toggle-btn" class="p-2 bg-white rounded-xl shadow-sm border border-surface-variant hover:bg-primary hover:text-white transition-all flex items-center justify-center text-primary" title="Alternar menú lateral">
                        <span class="material-symbols-outlined text-lg">menu_open</span>
                    </button>
                    <span class="font-bold text-xs text-on-surface/50 uppercase tracking-widest pr-2" id="sidebar-toggle-text">Ocultar Menú</span>
                </div>
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
                                <button id="btn-read-aloud" title="Lectura por voz" class="bg-secondary/10 text-secondary p-3.5 rounded-2xl font-bold flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-md border-2 border-secondary/20 active:scale-95">
                                    <span class="material-symbols-outlined">volume_up</span>
                                </button>
                                <button onclick="window.markLessonComplete()" title="Marcar como finalizado" class="bg-emerald-600 text-white p-3.5 rounded-2xl font-bold flex items-center justify-center hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95">
                                    <span class="material-symbols-outlined">check_circle</span>
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

        window.toggleModule = (index) => {
            const content = document.getElementById(`mod-content-${index}`);
            const icon = document.getElementById(`mod-icon-${index}`);
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        };

        window.toggleCourseSidebar = () => {
            const sidebar = document.querySelector('.course-sidebar');
            const btnIcon = document.querySelector('#sidebar-toggle-btn span');
            const btnText = document.querySelector('#sidebar-toggle-text');
            
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                btnIcon.innerText = 'menu_open';
                btnText.innerText = 'Ocultar Menú';
            } else {
                sidebar.classList.add('hidden');
                btnIcon.innerText = 'menu';
                btnText.innerText = 'Mostrar Menú';
            }
        };
        
        // Reusable: bind TTS to whichever btn-read-aloud exists in the DOM
        const bindReadAloudBtn = () => {
            const readBtn = document.getElementById('btn-read-aloud');
            if (!readBtn) return;

            readBtn.onclick = () => {
                if (isReading) {
                    window.speechSynthesis.cancel();
                    isReading = false;
                    readBtn.innerHTML = '<span class="material-symbols-outlined">volume_up</span>';
                    readBtn.title = 'Lectura por voz';
                    readBtn.classList.replace('bg-secondary', 'bg-secondary/10');
                    readBtn.classList.replace('text-white', 'text-secondary');
                } else {
                    if (!currentTranscript) return;
                    
                    // Split text into chunks (by sentences or newlines) to avoid TTS dropping out on long texts
                    const textToRead = currentTranscript.replace(/<[^>]*>/g, '').replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
                    let currentChunkIndex = 0;
                    
                    isReading = true;
                    readBtn.innerHTML = '<span class="material-symbols-outlined">stop_circle</span>';
                    readBtn.title = 'Detener lectura';
                    readBtn.classList.replace('bg-secondary/10', 'bg-secondary');
                    readBtn.classList.replace('text-secondary', 'text-white');

                    const speakNextChunk = () => {
                        if (!isReading || currentChunkIndex >= textToRead.length) {
                            // Finished reading all chunks or cancelled
                            isReading = false;
                            if (readBtn) {
                                readBtn.innerHTML = '<span class="material-symbols-outlined">volume_up</span>';
                                readBtn.title = 'Lectura por voz';
                                readBtn.classList.replace('bg-secondary', 'bg-secondary/10');
                                readBtn.classList.replace('text-white', 'text-secondary');
                            }
                            return;
                        }

                        const chunk = textToRead[currentChunkIndex].trim();
                        if (!chunk) {
                            currentChunkIndex++;
                            speakNextChunk();
                            return;
                        }

                        const utterance = new SpeechSynthesisUtterance(chunk);
                        utterance.lang = 'es-CO';
                        utterance.rate = 0.9;
                        
                        utterance.onend = () => {
                            currentChunkIndex++;
                            speakNextChunk();
                        };
                        
                        utterance.onerror = (e) => {
                            console.warn("TTS Error:", e);
                            currentChunkIndex++;
                            speakNextChunk();
                        };

                        window.speechSynthesis.speak(utterance);
                    };

                    speakNextChunk();
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
                // Document: buttons are embedded directly next to the viewer
                meta.classList.add('hidden');  // Hide the default meta section

                let viewerUrl = url;
                const isOfficeDoc = url.toLowerCase().includes('.pptx') || url.toLowerCase().includes('.ppt') || url.toLowerCase().includes('.docx') || url.toLowerCase().includes('.doc');
                if (isOfficeDoc) {
                    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
                }

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
                                <button id="btn-read-aloud" title="Extrayendo texto..." class="bg-secondary/10 text-secondary p-3 rounded-2xl font-bold flex items-center justify-center hover:bg-secondary hover:text-white transition-all shadow-md border-2 border-secondary/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg animate-spin">sync</span>
                                </button>
                                <a href="${url}" target="_blank" title="Descargar Archivo" class="bg-primary/10 text-primary p-3 rounded-2xl font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-md border-2 border-primary/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg">download</span>
                                </a>
                                <button onclick="window.markLessonComplete()" title="Finalizado" class="bg-emerald-600 text-white p-3 rounded-2xl font-bold flex items-center justify-center hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 text-sm">
                                    <span class="material-symbols-outlined text-lg">check_circle</span>
                                </button>
                            </div>
                        </div>

                        <!-- Document Viewer -->
                        <div class="w-full h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-surface-variant bg-white">
                            <iframe 
                                src="${viewerUrl}" 
                                class="w-full h-full border-none"
                                title="Documento">
                            </iframe>
                        </div>
                    </div>
                `;

                // Extract text from PDF or PPTX
                const extractDocumentText = async (docUrl) => {
                    try {
                        let fetchUrl = docUrl;
                        
                        // Convert Google Drive viewer links to direct download links
                        const gdriveMatch = docUrl.match(/drive\.google\.com\/file\/d\/([^/]+)/);
                        if (gdriveMatch) {
                            fetchUrl = `https://drive.google.com/uc?export=download&id=${gdriveMatch[1]}`;
                        }
                        
                        // Bypass CORS for external URLs (non-Supabase)
                        if (fetchUrl.startsWith('http') && !fetchUrl.includes('supabase.co')) {
                            fetchUrl = `https://corsproxy.io/?${encodeURIComponent(fetchUrl)}`;
                        }

                        const response = await fetch(fetchUrl);
                        if (!response.ok) throw new Error(`HTTP ${response.status}`);
                        const arrayBuffer = await response.arrayBuffer();
                        
                        // Check extension based on original URL
                        const isPptx = docUrl.toLowerCase().includes('.pptx');
                        
                        if (isPptx) {
                            if (!window.JSZip) {
                                console.warn('JSZip not loaded');
                                return null;
                            }
                            const zip = await JSZip.loadAsync(arrayBuffer);
                            let fullText = '';
                            
                            // Find all slide XML files
                            const slideFiles = Object.keys(zip.files).filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'));
                            
                            // Sort by slide number to read in order
                            slideFiles.sort((a, b) => {
                                const numA = parseInt(a.match(/\d+/) ? a.match(/\d+/)[0] : 0);
                                const numB = parseInt(b.match(/\d+/) ? b.match(/\d+/)[0] : 0);
                                return numA - numB;
                            });

                            const parser = new DOMParser();
                            for (const filename of slideFiles) {
                                const xmlContent = await zip.file(filename).async("string");
                                
                                // Extract text from <a:t> tags
                                const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
                                const tNodes = xmlDoc.getElementsByTagName("a:t");
                                let slideText = "";
                                
                                if (tNodes.length > 0) {
                                    for (let i = 0; i < tNodes.length; i++) {
                                        slideText += tNodes[i].textContent + " ";
                                    }
                                } else {
                                    // Fallback Regex if DOMParser misses namespaces
                                    const textMatches = xmlContent.match(/<a:t[^>]*>.*?<\/a:t>/g) || [];
                                    slideText = textMatches.map(match => {
                                        return match.replace(/<a:t[^>]*>/, '').replace(/<\/a:t>/, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                                    }).join(' ');
                                }
                                
                                if (slideText.trim()) fullText += slideText.trim() + '\n\n';
                            }
                            return fullText.trim() || null;
                            
                        } else {
                            // PDF
                            if (!window.pdfjsLib) {
                                console.warn('PDF.js not loaded');
                                return null;
                            }
                            const uint8Array = new Uint8Array(arrayBuffer);
                            const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
                            let fullText = '';
                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);
                                const content = await page.getTextContent();
                                const pageText = content.items.map(item => item.str).join(' ');
                                fullText += pageText + '\n\n';
                            }
                            return fullText.trim() || null;
                        }
                    } catch (err) {
                        console.warn('Document text extraction failed:', err);
                        return null;
                    }
                };

                extractDocumentText(url).then(extractedText => {
                    const readBtn = document.getElementById('btn-read-aloud');
                    // Fallback to the existing transcript or title if extraction fails (do NOT use text as it contains the URL for PDFs)
                    currentTranscript = extractedText || transcript || title || '';
                    
                    if (currentTranscript) {
                        if (readBtn) {
                            readBtn.innerHTML = '<span class="material-symbols-outlined text-lg">volume_up</span>';
                            readBtn.title = 'Lectura por voz';
                            readBtn.classList.remove('opacity-40', 'cursor-not-allowed');
                        }
                    } else {
                        if (readBtn) {
                            readBtn.innerHTML = '<span class="material-symbols-outlined text-lg">volume_off</span>';
                            readBtn.title = 'No disponible';
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
