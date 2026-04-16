/**
 * interpreter.js
 * Sign Language (LSC) Floating Interpreter Component
 */

export const Interpreter = {
    state: {
        visible: false,
        videoUrl: 'https://www.youtube.com/embed/placeholder', // Default placeholder
        isDragging: false,
        pos: { x: 20, y: 20 }
    },

    init() {
        // Listen for global LSC toggle
        window.addEventListener('lsc-changed', (e) => {
            this.state.visible = e.detail;
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
                <div class="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-black/40 to-transparent flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" id="lsc-handle">
                    <span class="text-[10px] font-bold text-white uppercase tracking-widest">Intérprete LSC</span>
                    <button class="text-white hover:text-accent" id="lsc-minimize">
                        <span class="material-symbols-outlined text-sm">close</span>
                    </button>
                </div>

                <!-- Video Placeholder/Iframe -->
                <div class="w-full h-full bg-black/80 flex items-center justify-center relative">
                    ${this.state.videoUrl.includes('placeholder') ? 
                        `<div class="flex flex-col items-center text-center p-4">
                            <span class="material-symbols-outlined text-white/20 text-4xl mb-2">back_hand</span>
                            <p class="text-[9px] text-white/40 leading-tight">Configura un video LSC para esta lección</p>
                        </div>` : 
                        `<iframe src="${this.state.videoUrl}" 
                                 class="w-full h-full border-none pointer-events-none" 
                                 allow="autoplay; encrypted-media" 
                                 allowfullscreen></iframe>`
                    }
                    
                    <!-- Overlay for empty state or info -->
                    <div class="absolute bottom-2 left-2 bg-primary/80 px-2 py-0.5 rounded text-[8px] font-bold text-white uppercase tracking-tighter">
                        LSC En Vivo
                    </div>
                </div>
            </div>
        `;

        this.addEventListeners();
    },

    addEventListeners() {
        const minimize = document.getElementById('lsc-minimize');
        if (minimize) {
            minimize.onclick = () => {
                // Toggle off via the main switch
                const lscToggle = document.getElementById('lsc-toggle');
                if (lscToggle) lscToggle.click();
            };
        }

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
    }
};
