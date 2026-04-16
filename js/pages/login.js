import { supabase } from '../admin/data.js';

export const Login = {
    render: async () => {
        return `
        <div class="flex items-center justify-center min-h-[70vh] animate-in fade-in duration-500">
            <div class="bg-white/80 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-surface-variant max-w-md w-full relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div class="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                
                <!-- Tabs -->
                <div class="relative z-10 flex rounded-2xl bg-surface-variant/50 p-1 mb-8">
                    <button id="tab-login" class="flex-1 py-3 rounded-xl font-bold text-sm transition-all bg-white text-primary shadow-sm">Iniciar Sesión</button>
                    <button id="tab-register" class="flex-1 py-3 rounded-xl font-bold text-sm transition-all text-on-surface/50 hover:text-on-surface">Crear Cuenta</button>
                </div>

                <!-- LOGIN FORM -->
                <div id="form-login" class="relative z-10">
                    <div class="text-center mb-6">
                        <span class="material-symbols-outlined text-4xl text-primary mb-2 inline-block">person</span>
                        <h2 class="text-2xl font-headline font-bold text-primary">Ingresar</h2>
                        <p class="text-on-surface/60 mt-1 text-sm">Accede al portal con tu cuenta.</p>
                    </div>
                    
                    <form id="login-form" class="space-y-5">
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Correo Electrónico</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">mail</span>
                                <input type="email" id="login-email" required placeholder="tu@correo.com" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Contraseña</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">lock</span>
                                <input type="password" id="login-password" required placeholder="••••••••" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        
                        <div id="login-error" class="hidden bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 font-medium text-center"></div>
                        
                        <button type="submit" id="btn-login" class="w-full bg-primary hover:bg-[#0052b4] text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                            <span id="btn-login-text">Iniciar Sesión</span>
                            <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </form>
                </div>

                <!-- REGISTER FORM -->
                <div id="form-register" class="relative z-10 hidden">
                    <div class="text-center mb-6">
                        <span class="material-symbols-outlined text-4xl text-secondary mb-2 inline-block">person_add</span>
                        <h2 class="text-2xl font-headline font-bold text-secondary">Crear Cuenta</h2>
                        <p class="text-on-surface/60 mt-1 text-sm">Regístrate para acceder a los cursos.</p>
                    </div>
                    
                    <form id="register-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Nombre Completo</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">badge</span>
                                <input type="text" id="reg-name" required placeholder="Tu nombre completo" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Correo Electrónico</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">mail</span>
                                <input type="email" id="reg-email" required placeholder="tu@correo.com" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Contraseña</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">lock</span>
                                <input type="password" id="reg-password" required minlength="6" placeholder="Mínimo 6 caracteres" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-bold mb-2 ml-1 text-on-surface/80">Confirmar Contraseña</label>
                            <div class="relative">
                                <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface/40">lock_reset</span>
                                <input type="password" id="reg-confirm" required minlength="6" placeholder="Repite tu contraseña" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl py-3 pl-12 pr-4 focus:ring-4 focus:ring-secondary/20 focus:border-secondary transition-all text-on-surface font-medium outline-none">
                            </div>
                        </div>
                        
                        <div id="register-error" class="hidden bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-100 font-medium text-center"></div>
                        <div id="register-success" class="hidden bg-green-50 text-green-700 text-sm p-4 rounded-xl border border-green-200 font-medium text-center"></div>
                        
                        <button type="submit" id="btn-register" class="w-full bg-secondary hover:bg-[#15571d] text-white py-4 rounded-2xl font-bold shadow-lg shadow-secondary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                            <span id="btn-register-text">Crear Mi Cuenta</span>
                            <span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">how_to_reg</span>
                        </button>
                    </form>
                </div>

                <p class="relative z-10 text-xs text-center mt-6 text-on-surface/40 font-medium">LMS Protegido por autenticación de Supabase (RLS)</p>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        // Tab switching
        const tabLogin = document.getElementById('tab-login');
        const tabRegister = document.getElementById('tab-register');
        const formLogin = document.getElementById('form-login');
        const formRegister = document.getElementById('form-register');

        tabLogin.onclick = () => {
            formLogin.classList.remove('hidden');
            formRegister.classList.add('hidden');
            tabLogin.className = 'flex-1 py-3 rounded-xl font-bold text-sm transition-all bg-white text-primary shadow-sm';
            tabRegister.className = 'flex-1 py-3 rounded-xl font-bold text-sm transition-all text-on-surface/50 hover:text-on-surface';
        };

        tabRegister.onclick = () => {
            formRegister.classList.remove('hidden');
            formLogin.classList.add('hidden');
            tabRegister.className = 'flex-1 py-3 rounded-xl font-bold text-sm transition-all bg-white text-secondary shadow-sm';
            tabLogin.className = 'flex-1 py-3 rounded-xl font-bold text-sm transition-all text-on-surface/50 hover:text-on-surface';
        };

        // ========== LOGIN ==========
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        const btnLoginText = document.getElementById('btn-login-text');

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            loginError.classList.add('hidden');
            btnLoginText.innerText = 'Verificando...';

            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) throw error;

                if (data.session) {
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
                loginError.innerText = err.message || 'Credenciales inválidas. Inténtalo de nuevo.';
                loginError.classList.remove('hidden');
                btnLoginText.innerText = 'Iniciar Sesión';
            }
        });

        // ========== REGISTER ==========
        const registerForm = document.getElementById('register-form');
        const registerError = document.getElementById('register-error');
        const registerSuccess = document.getElementById('register-success');
        const btnRegText = document.getElementById('btn-register-text');

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirm = document.getElementById('reg-confirm').value;

            registerError.classList.add('hidden');
            registerSuccess.classList.add('hidden');

            // Validation
            if (password !== confirm) {
                registerError.innerText = 'Las contraseñas no coinciden.';
                registerError.classList.remove('hidden');
                return;
            }

            if (password.length < 6) {
                registerError.innerText = 'La contraseña debe tener al menos 6 caracteres.';
                registerError.classList.remove('hidden');
                return;
            }

            btnRegText.innerText = 'Creando cuenta...';

            try {
                // 1. Create auth user in Supabase with metadata for the trigger
                const { data: authData, error: authError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name
                        }
                    }
                });

                if (authError) throw authError;

                // 2. Show success (The profile is created automatically by the backend trigger)
                registerSuccess.innerHTML = `
                    <span class="material-symbols-outlined text-green-600 text-2xl mb-1 block">check_circle</span>
                    <strong>¡Registro iniciado!</strong><br>
                    <span class="text-green-600/80">Te hemos enviado un correo de confirmación. Una vez confirmado, podrás iniciar sesión.</span>
                `;
                registerSuccess.classList.remove('hidden');
                registerForm.reset();
                btnRegText.innerText = 'Crear Mi Cuenta';

                // Auto-switch to login after 3 seconds
                setTimeout(() => {
                    tabLogin.click();
                }, 4000);

            } catch (err) {
                let msg = err.message || 'Error al crear la cuenta. Inténtalo de nuevo.';
                if (msg.includes('already registered')) {
                    msg = 'Este correo ya tiene una cuenta registrada. Intenta iniciar sesión.';
                }
                registerError.innerText = msg;
                registerError.classList.remove('hidden');
                btnRegText.innerText = 'Crear Mi Cuenta';
            }
        });
    }
};
