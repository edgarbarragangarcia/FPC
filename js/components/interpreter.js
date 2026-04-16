/**
 * interpreter.js
 * Sign Language (LSC) Floating Interpreter Component
 */

export const Interpreter = {
    state: {
        visible: false,
        mode: 'avatar', // 'video' or 'avatar'
        videoUrl: 'https://www.youtube.com/embed/placeholder',
        transcription: 'Escuchando...',
        isDragging: false,
        pos: { x: 20, y: 20 }
    },

    recognition: null,

    init() {
        // Inject Styles
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes lsc-bounce {
                0%, 100% { transform: scale(2.5) rotate(0deg) translateY(20px); }
                50% { transform: scale(2.55) rotate(1deg) translateY(15px); }
            }
            .lsc-animating {
                animation: lsc-bounce 0.3s ease-in-out infinite !important;
            }
            #lsc-transcription {
                text-shadow: 0 4px 12px rgba(0,0,0,0.8);
                line-height: 1.5;
            }
        `;
        document.head.appendChild(style);

        // Init Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.lang = 'es-CO';
            
            this.recognition.onresult = (event) => {
                const text = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
                this.state.transcription = text;
                const textEl = document.getElementById('lsc-transcription');
                if (textEl) textEl.innerText = text;
                
                // Animate avatar via class
                const avatar = document.getElementById('lsc-avatar-img');
                if (avatar) {
                    avatar.classList.add('lsc-animating');
                    clearTimeout(this.animTimeout);
                    this.animTimeout = setTimeout(() => avatar.classList.remove('lsc-animating'), 1000);
                }
            };
        }

        // Listen for global LSC toggle
        window.addEventListener('lsc-changed', (e) => {
            this.state.visible = e.detail;
            if (this.state.visible && this.state.mode === 'avatar') this.startListening();
            else this.stopListening();
            this.render();
        });

        // Listen for specific lesson video changes
        window.addEventListener('lsc-video-update', (e) => {
            this.state.videoUrl = e.detail || 'https://www.youtube.com/embed/placeholder';
            if (this.state.visible) this.render();
        });
        
        // Initial check if state already exists
        if (window.state && window.state.lscEnabled) {
            this.state.visible = true;
            this.render();
        }
    },

    render() {
        const root = document.getElementById('interpreter-root');
        if (!root) return;

        if (!this.state.visible) {
            root.innerHTML = '';
            return;
        }

        root.innerHTML = `
            <div id="lsc-window" 
                 class="fixed bottom-6 right-6 w-80 aspect-video bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-[100] overflow-hidden group animate-in slide-in-from-bottom-10 duration-500"
                 style="resize: both; min-width: 250px; min-height: 150px; cursor: s-resize;">
                
                <!-- Header/Drag Handle -->
                <div class="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" id="lsc-handle">
                    <div class="flex items-center gap-2">
                        <button id="lsc-mode-toggle" class="bg-black/40 hover:bg-black/60 px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-widest border border-white/10 shadow-lg">
                            Modo: ${this.state.mode === 'avatar' ? 'Avatar IA' : 'Video LSC'}
                        </button>
                    </div>
                    <div class="flex items-center gap-2">
                         <span class="material-symbols-outlined text-white/40 text-sm">drag_handle</span>
                         <button class="text-white hover:text-accent p-1" id="lsc-minimize">
                            <span class="material-symbols-outlined text-sm">close</span>
                         </button>
                    </div>
                </div>

                <!-- Main Content Root -->
                <div class="w-full h-full bg-black/95 flex items-center justify-center relative pointer-events-none">
                    ${this.state.mode === 'avatar' ? `
                        <!-- Avatar Mode -->
                        <div class="flex flex-col items-center justify-center w-full h-full p-4 relative overflow-hidden pointer-events-none">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
                            <img id="lsc-avatar-img" src="./assets/img/avatar.png" 
                                 class="h-[250%] object-contain mt-20 transform-gpu transition-all duration-300 z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] origin-top">
                            <div class="absolute bottom-4 left-4 right-4 z-20">
                                <p id="lsc-transcription" class="text-lg md:text-xl font-bold text-white bg-black/60 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/20 text-center italic shadow-2xl">
                                    ${this.state.transcription}
                                </p>
                            </div>
                        </div>
                    ` : `
                        <!-- Video Mode -->
                        <div class="w-full h-full pointer-events-auto">
                            ${this.state.videoUrl.includes('placeholder') ? 
                                `<div class="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                                    <div class="animate-pulse flex items-center justify-center w-16 h-16 bg-white/5 rounded-full border border-white/10">
                                        <span class="material-symbols-outlined text-white/40 text-3xl">back_hand</span>
                                    </div>
                                    <div class="space-y-1">
                                        <p class="text-xs font-bold text-white/80 uppercase tracking-widest">Esperando Contenido</p>
                                        <p class="text-[10px] text-white/40 px-4">Este material no tiene intérprete aún.</p>
                                    </div>
                                    <a href="http://centroderelevo.gov.co/" target="_blank" class="bg-secondary/80 hover:bg-secondary text-[10px] font-bold text-white px-4 py-2 rounded-full transition-all flex items-center gap-2 pointer-events-auto">
                                        <span class="material-symbols-outlined text-xs">external_link</span>
                                        Centro de Relevo
                                    </a>
                                </div>` : 
                                `<iframe src="${this.state.videoUrl}" 
                                         class="w-full h-full border-none" 
                                         allow="autoplay; encrypted-media" 
                                         allowfullscreen></iframe>`
                            }
                        </div>
                    `}
                    
                    <!-- Resize Handle Icon (Visual only) -->
                    <div class="absolute bottom-1 right-1 opacity-0 group-hover:opacity-40 transition-opacity">
                        <span class="material-symbols-outlined text-white text-sm scale-x-[-1]">south_east</span>
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    addEventListeners() {
        const minimize = document.getElementById('lsc-minimize');
        if (minimize) {
            minimize.onclick = (e) => {
                e.stopPropagation();
                window.toggleLSC();
            };
        }

        const modeToggle = document.getElementById('lsc-mode-toggle');
        if (modeToggle) {
            modeToggle.onclick = (e) => {
                e.stopPropagation();
                this.state.mode = this.state.mode === 'avatar' ? 'video' : 'avatar';
                if (this.state.mode === 'avatar') this.startListening();
                else this.stopListening();
                this.render();
            };
        }

        // Basic Draggable Logic
        const windowEl = document.getElementById('lsc-window');
        const handle = document.getElementById('lsc-handle');
        
        if (handle && windowEl) {
            let isDragging = false;
            let offset = { x: 0, y: 0 };
            
            const onMouseDown = (e) => {
                isDragging = true;
                offset.x = e.clientX - windowEl.getBoundingClientRect().left;
                offset.y = e.clientY - windowEl.getBoundingClientRect().top;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
                windowEl.style.transition = 'none';
                handle.style.opacity = '1';
            };

            const onMouseMove = (e) => {
                if (!isDragging) return;
                windowEl.style.left = (e.clientX - offset.x) + 'px';
                windowEl.style.top = (e.clientY - offset.y) + 'px';
                windowEl.style.bottom = 'auto';
                windowEl.style.right = 'auto';
            };

            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                windowEl.style.transition = 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)';
                handle.style.opacity = '';
            };

            handle.addEventListener('mousedown', onMouseDown);
        }
    },

    startListening() {
        if (this.recognition) {
            try {
                this.recognition.start();
            } catch (e) { console.warn('Speech recognition already started'); }
        }
    },

    stopListening() {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) { }
        }
    }
};
