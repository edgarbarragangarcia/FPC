import { supabase } from '../admin/data.js';

export const Login = {
    render: async () => {
        return `
        <div class="flex items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
            <div class="bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-surface-variant max-w-md w-full relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 text-center mb-8">
                    <span class="material-symbols-outlined text-5xl text-primary mb-4 p-4 bg-primary/5 rounded-full">person</span>
                    <h2 class="text-3xl font-headline font-bold text-primary">Ingresar</h2>
                    <p class="text-on-surface/60 mt-2 text-sm">Accede al portal de estudiantes y administradores con tu cuenta de Supabase.</p>
                </div>
                
                <form id="login-form" class="relative z-10 space-y-6">
                    <div>
                        <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Correo Electrónico</label>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">mail</span>
                            <input type="email" id="email" required placeholder="tu@correo.com" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Contraseña</label>
                        <div class="relative">
                            <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">lock</span>
                            <input type="password" id="password" required placeholder="••••••••" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none">
                        </div>
                    </div>
                    
                    <div id="login-error" class="hidden bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 font-medium text-center"></div>
                    
                    <button type="submit" id="btn-submit" class="w-full bg-primary hover:bg-[#0052b4] text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                        <span id="btn-text">Iniciar Sesión</span>
                        <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                    
                    <p class="text-xs text-center mt-6 text-on-surface/50 font-medium">LMS Protegido por autenticación de Supabase (RLS)</p>
                </form>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const form = document.getElementById('login-form');
        const errorDiv = document.getElementById('login-error');
        const btnText = document.getElementById('btn-text');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            errorDiv.classList.add('hidden');
            btnText.innerText = 'Verificando...';

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) {
                    throw error;
                }

                if (data.session) {
                    // Fetch full profile to get role and details
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('email', email)
                        .single();

                    if (profileError) throw profileError;

                    window.state.user = { 
                        loggedIn: true, 
                        email: data.user.email, 
                        id: profileData.id,
                        role: profileData.role,
                        name: profileData.name,
                        avatar: profileData.avatar
                    };
                    
                    if(profileData.role === 'admin') {
                        window.location.hash = '#/admin';
                    } else {
                        window.location.hash = '#/dashboard';
                    }
                }
            } catch (err) {
                errorDiv.innerText = err.message || 'Credenciales inválidas. Inténtalo de nuevo.';
                errorDiv.classList.remove('hidden');
                btnText.innerText = 'Iniciar Sesión';
            }
        });
    }
};
