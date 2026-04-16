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
                
                // Animate avatar
                const avatar = document.getElementById('lsc-avatar-img');
                if (avatar) {
                    avatar.style.transform = `scale(${1 + (Math.random() * 0.05)}) rotate(${Math.random() * 2 - 1}deg)`;
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
                 class="fixed bottom-6 right-6 w-64 aspect-video bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl z-[100] overflow-hidden group animate-in slide-in-from-bottom-10 duration-500"
                 style="resize: both; min-width: 200px; min-height: 120px;">
                
                <!-- Header/Drag Handle -->
                <div class="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" id="lsc-handle">
                    <div class="flex items-center gap-2">
                        <button id="lsc-mode-toggle" class="bg-black/40 hover:bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-widest border border-white/10">
                            Modo: ${this.state.mode === 'avatar' ? 'Avatar IA' : 'Video En Vivo'}
                        </button>
                    </div>
                    <button class="text-white hover:text-accent" id="lsc-minimize">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                <!-- Main Content Root -->
                <div class="w-full h-full bg-black/95 flex items-center justify-center relative">
                    ${this.state.mode === 'avatar' ? `
                        <!-- Avatar Mode -->
                        <div class="flex flex-col items-center justify-center w-full h-full p-4 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-0"></div>
                            
                            <!-- Sound Wave Animation -->
                            <div class="absolute bottom-12 flex items-center gap-1 opacity-50">
                                <div class="w-1 h-3 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                                <div class="w-1 h-6 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                                <div class="w-1 h-4 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.3s"></div>
                                <div class="w-1 h-5 bg-secondary rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                            </div>

                            <img id="lsc-avatar-img" src="./sign_language_avatar_1776366810694.png" 
                                 class="h-[250%] object-contain mt-20 transform-gpu transition-transform duration-100 z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] origin-top">
                            
                            <!-- Transcription Bubble -->
                            <div class="absolute bottom-4 left-4 right-4 z-20">
                                <p id="lsc-transcription" class="text-[9px] text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center truncate italic">
                                    ${this.state.transcription}
                                </p>
                            </div>
                        </div>
                    ` : `
                        <!-- Video Mode -->
                        ${this.state.videoUrl.includes('placeholder') ? 
                            `<div class="flex flex-col items-center text-center p-6 space-y-3">
                                <div class="animate-pulse flex items-center justify-center w-12 h-12 bg-white/5 rounded-full border border-white/10">
                                    <span class="material-symbols-outlined text-white/40 text-2xl">back_hand</span>
                                </div>
                                <div class="space-y-1">
                                    <p class="text-[10px] font-bold text-white/80 leading-tight uppercase tracking-widest">Esperando Contenido</p>
                                    <p class="text-[9px] text-white/40 leading-tight px-4">Este material aún no tiene un intérprete asignado.</p>
                                </div>
                                <a href="http://centroderelevo.gov.co/" target="_blank" class="mt-2 bg-secondary/80 hover:bg-secondary text-[8px] font-bold text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
                                    <span class="material-symbols-outlined text-[10px]">external_link</span>
                                    Centro de Relevo (Oficial)
                                </a>
                            </div>` : 
                            `<iframe src="${this.state.videoUrl}" 
                                     class="w-full h-full border-none" 
                                     allow="autoplay; encrypted-media" 
                                     allowfullscreen></iframe>`
                        }
                    `}
                    
                    <!-- Mode Label -->
                    <div class="absolute top-2 left-2 bg-primary/80 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-tighter z-20">
                        ${this.state.mode === 'avatar' ? 'Intérprete IA' : 'LSC En Vivo'}
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    addEventListeners() {
        // Minimize
        document.getElementById('lsc-minimize')?.addEventListener('click', () => {
             const lscToggle = document.getElementById('lsc-toggle');
             if (lscToggle) lscToggle.click();
        });

        // Mode Toggle
        document.getElementById('lsc-mode-toggle')?.addEventListener('click', () => {
            this.state.mode = this.state.mode === 'avatar' ? 'video' : 'avatar';
            if (this.state.mode === 'avatar') this.startListening();
            else this.stopListening();
            this.render();
        });

        // Basic Draggable Logic
        const windowEl = document.getElementById('lsc-window');
        const handle = document.getElementById('lsc-handle');
        
        if (handle && windowEl) {
            let offset = { x: 0, y: 0 };
            
            const onMouseDown = (e) => {
                this.state.isDragging = true;
                offset.x = e.clientX - windowEl.offsetLeft;
                offset.y = e.clientY - windowEl.offsetTop;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            };

            const onMouseMove = (e) => {
                if (!this.state.isDragging) return;
                windowEl.style.left = (e.clientX - offset.x) + 'px';
                windowEl.style.top = (e.clientY - offset.y) + 'px';
                windowEl.style.bottom = 'auto';
                windowEl.style.right = 'auto';
            };

            const onMouseUp = () => {
                this.state.isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
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
