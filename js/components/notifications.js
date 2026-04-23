/**
 * Custom Notification System for FPC LMS
 * Replaces standard browser alert() and confirm()
 */

export const Notifications = {
    init: () => {
        if (document.getElementById('ui-overlay-container')) return;
        
        const container = document.createElement('div');
        container.id = 'ui-overlay-container';
        container.className = 'fixed inset-0 z-[1000] pointer-events-none flex items-center justify-center p-6';
        document.body.appendChild(container);

        // Add base styles if not present
        if (!document.getElementById('notifications-styles')) {
            const style = document.createElement('style');
            style.id = 'notifications-styles';
            style.innerHTML = `
                @keyframes modal-in {
                    from { opacity: 0; transform: scale(0.9) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .modal-animate-in { animation: modal-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
                
                @keyframes toast-in {
                    from { opacity: 0; transform: translateY(100%); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .toast-animate-in { animation: toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            `;
            document.head.appendChild(style);
        }
    },

    confirm: (title, message, onConfirm, onCancel = null) => {
        Notifications.init();
        const container = document.getElementById('ui-overlay-container');
        container.classList.remove('pointer-events-none');
        
        const modalId = `modal-${Date.now()}`;
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-primary/20 backdrop-blur-md opacity-0 transition-opacity duration-300 pointer-events-auto';
        
        const modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'relative w-full max-w-md bg-surface rounded-[2rem] p-8 shadow-2xl border border-white/50 modal-animate-in pointer-events-auto overflow-hidden';
        modal.innerHTML = `
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div class="relative z-10 flex flex-col items-center text-center">
                <div class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                    <span class="material-symbols-outlined text-3xl font-light">help_center</span>
                </div>
                <h3 class="text-2xl font-headline font-bold text-primary mb-3">${title}</h3>
                <p class="text-on-surface/60 font-medium leading-relaxed mb-8">${message}</p>
                <div class="flex gap-3 w-full">
                    <button id="${modalId}-cancel" class="flex-1 py-4 px-6 border border-surface-variant hover:bg-surface-variant/30 rounded-2xl font-bold text-on-surface/50 transition-all">Cancelar</button>
                    <button id="${modalId}-confirm" class="flex-1 py-4 px-6 bg-primary text-white hover:bg-[#0052b4] rounded-2xl font-bold shadow-lg shadow-primary/20 transition-all">Confirmar</button>
                </div>
            </div>
        `;

        container.appendChild(backdrop);
        container.appendChild(modal);
        
        // Final opacity trigger
        requestAnimationFrame(() => backdrop.style.opacity = '1');

        const cleanup = () => {
            backdrop.style.opacity = '0';
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (container.contains(backdrop)) container.removeChild(backdrop);
                if (container.contains(modal)) container.removeChild(modal);
                if (container.children.length === 0) container.classList.add('pointer-events-none');
            }, 300);
        };

        document.getElementById(`${modalId}-confirm`).onclick = () => {
            cleanup();
            if (onConfirm) onConfirm();
        };

        document.getElementById(`${modalId}-cancel`).onclick = () => {
            cleanup();
            if (onCancel) onCancel();
        };
    },

    alert: (title, message, type = 'info') => {
        Notifications.init();
        const container = document.getElementById('ui-overlay-container');
        container.classList.remove('pointer-events-none');
        
        const modalId = `alert-${Date.now()}`;
        const backdrop = document.createElement('div');
        backdrop.className = 'fixed inset-0 bg-primary/10 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 pointer-events-auto';
        
        const modal = document.createElement('div');
        modal.id = modalId;
        const iconColor = type === 'error' ? 'text-red-500' : type === 'success' ? 'text-emerald-500' : 'text-primary';
        const iconBg = type === 'error' ? 'bg-red-50' : type === 'success' ? 'bg-emerald-50' : 'bg-primary/10';
        const icon = type === 'error' ? 'error' : type === 'success' ? 'check_circle' : 'info';

        modal.className = 'relative w-full max-w-sm bg-surface rounded-[2rem] p-8 shadow-2xl border border-white modal-animate-in pointer-events-auto';
        modal.innerHTML = `
            <div class="flex flex-col items-center text-center">
                <div class="w-14 h-14 ${iconBg} ${iconColor} rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                    <span class="material-symbols-outlined text-3xl">${icon}</span>
                </div>
                <h3 class="text-xl font-headline font-bold text-primary mb-2">${title}</h3>
                <p class="text-on-surface/50 text-sm font-medium leading-relaxed mb-6">${message}</p>
                <button id="${modalId}-ok" class="w-full py-3.5 bg-primary text-white rounded-2xl font-bold shadow-md hover:opacity-90 transition-all">Aceptar</button>
            </div>
        `;

        container.appendChild(backdrop);
        container.appendChild(modal);
        requestAnimationFrame(() => backdrop.style.opacity = '1');

        document.getElementById(`${modalId}-ok`).onclick = () => {
            backdrop.style.opacity = '0';
            modal.style.opacity = '0';
            setTimeout(() => {
                if (container.contains(backdrop)) container.removeChild(backdrop);
                if (container.contains(modal)) container.removeChild(modal);
                if (container.children.length === 0) container.classList.add('pointer-events-none');
            }, 300);
        };
    }
};

// Globalize for older code
window.UI = Notifications;
