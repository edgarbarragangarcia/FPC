// Admin Courses Management Page - Full Course Builder
import { DB } from '../data.js';

export const AdminCourses = {
    render: async () => {
        const courses = DB.getCourses();

        return `
        <div class="space-y-8 pb-12">
            <!-- Header -->
            <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                    <h2 class="text-4xl font-headline font-extrabold tracking-tight">Gestión de Cursos</h2>
                    <p class="text-white/80 text-lg font-medium">Crea, estructura y publica cursos para tus estudiantes.</p>
                </div>
                <button onclick="window.openCourseBuilder()" class="relative z-10 bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span class="material-symbols-outlined font-light text-[22px]">add</span>
                    <span>Nuevo Curso</span>
                </button>
            </header>

            <!-- Courses Table -->
            <div class="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-x-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <table class="min-w-full text-left border-collapse">
                    <thead class="bg-surface/40 border-b border-surface-variant/50">
                        <tr>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Curso</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Categoría</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Estado</th>
                            <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-variant/30">
                        ${courses.map((course, index) => `
                        <tr class="hover:bg-white transition-all duration-300 group ${index % 2 === 0 ? 'bg-transparent' : 'bg-surface/10'}">
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-5">
                                    <div class="relative w-16 h-12 rounded-xl overflow-hidden shadow-sm border border-white ring-2 ring-white/50 group-hover:scale-105 transition-transform duration-300">
                                        <img src="${course.img}" alt="" class="w-full h-full object-cover">
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-extrabold text-primary text-base group-hover:text-[#0052b4] transition-colors">${course.title}</span>
                                        <span class="text-xs text-on-surface/40 font-medium tracking-wide mt-0.5">${course.duration || '--'} &bull; ${course.level || '--'}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border bg-surface text-primary border-surface-variant/50 shadow-sm">
                                    ${course.category || 'Sin categoría'}
                                </span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-2">
                                    <span class="w-2.5 h-2.5 rounded-full ${course.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'} shadow-sm"></span>
                                    <span class="text-xs font-bold uppercase tracking-wider ${course.status === 'published' ? 'text-emerald-700' : 'text-amber-700'}">
                                        ${course.status === 'published' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </div>
                            </td>
                            <td class="px-8 py-6 text-right">
                                <div class="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onclick="window.openCourseBuilder(${course.id})" class="p-2.5 bg-surface hover:bg-primary hover:text-white text-primary rounded-xl transition-all duration-300 hover:shadow-md" title="Editar y Gestionar Contenido">
                                        <span class="material-symbols-outlined text-xl">edit_note</span>
                                    </button>
                                    <button onclick="window.deleteCourse(${course.id})" class="p-2.5 bg-surface hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all duration-300 hover:shadow-md" title="Eliminar">
                                        <span class="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Course Builder Modal (Full Screen Overlay) -->
            <div id="course-builder" class="hidden fixed inset-0 z-[200] bg-surface overflow-y-auto">
                <div class="max-w-5xl mx-auto py-8 px-6">
                    <!-- Builder Header -->
                    <div class="flex justify-between items-center mb-8">
                        <div>
                            <h2 id="builder-title" class="text-3xl font-headline font-bold text-primary">Nuevo Curso</h2>
                            <p class="text-sm text-on-surface/50 mt-1">Completa la información y estructura el contenido.</p>
                        </div>
                        <button onclick="window.closeCourseBuilder()" class="p-3 hover:bg-surface-variant rounded-full transition-all">
                            <span class="material-symbols-outlined text-2xl">close</span>
                        </button>
                    </div>

                    <!-- Tab Navigation -->
                    <div class="flex gap-1 bg-surface-variant/50 rounded-2xl p-1.5 mb-8" role="tablist">
                        <button onclick="window.switchBuilderTab('info')" id="tab-info" class="builder-tab flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all bg-white text-primary shadow-sm" role="tab">
                            <span class="material-symbols-outlined text-lg">info</span> Información
                        </button>
                        <button onclick="window.switchBuilderTab('content')" id="tab-content" class="builder-tab flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all text-on-surface/50 hover:text-primary" role="tab">
                            <span class="material-symbols-outlined text-lg">menu_book</span> Contenido
                        </button>
                        <button onclick="window.switchBuilderTab('publish')" id="tab-publish" class="builder-tab flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all text-on-surface/50 hover:text-primary" role="tab">
                            <span class="material-symbols-outlined text-lg">publish</span> Publicar
                        </button>
                    </div>

                    <!-- Tab 1: Course Info -->
                    <div id="panel-info" class="builder-panel">
                        <form id="course-info-form" class="bg-white rounded-3xl border border-surface-variant p-8 space-y-6 shadow-sm">
                            <input type="hidden" id="course-id">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-sm font-bold ml-1">Título del Curso *</label>
                                    <input type="text" id="course-title" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg font-bold" required placeholder="Ej: Liderazgo Digital Inclusivo">
                                </div>
                                <div class="space-y-2 md:col-span-2">
                                    <label class="text-sm font-bold ml-1">Descripción del curso</label>
                                    <textarea id="course-description" rows="3" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Describe los objetivos y contenido del curso..."></textarea>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold ml-1">Categoría</label>
                                    <select id="course-category" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                        <option value="Laboral">Laboral</option>
                                        <option value="Tecnología">Tecnología</option>
                                        <option value="Negocios">Negocios</option>
                                        <option value="Bienestar">Bienestar</option>
                                    </select>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold ml-1">Duración Total</label>
                                    <input type="text" id="course-duration" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: 12h">
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold ml-1">Nivel de Accesibilidad</label>
                                    <select id="course-level" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                        <option value="Accesibilidad AAA">Accesibilidad AAA</option>
                                        <option value="Visual Focus">Visual Focus</option>
                                        <option value="Cognitivo Adaptado">Cognitivo Adaptado</option>
                                    </select>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold ml-1">Imagen URL</label>
                                    <input type="url" id="course-img" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://...">
                                </div>
                            </div>
                            <div class="flex justify-end pt-4">
                                <button type="submit" class="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                    <span class="material-symbols-outlined text-lg">save</span> Guardar Información
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Tab 2: Course Content (Modules & Lessons) -->
                    <div id="panel-content" class="builder-panel hidden">
                        <div id="content-needs-save" class="hidden text-center py-16 bg-white rounded-3xl border border-surface-variant shadow-sm">
                            <span class="material-symbols-outlined text-5xl text-on-surface/20 mb-4 block">save</span>
                            <h3 class="text-lg font-bold text-on-surface/60">Primero guarda la información del curso</h3>
                            <p class="text-sm text-on-surface/40 mt-1">Ve a la pestaña "Información" y guarda los datos básicos.</p>
                        </div>

                        <div id="content-editor" class="hidden space-y-6">
                            <div class="flex justify-between items-center">
                                <h3 class="text-xl font-bold text-primary">Estructura del Curso</h3>
                                <button onclick="window.addModule()" class="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-all shadow-md">
                                    <span class="material-symbols-outlined text-lg">add</span> Agregar Módulo
                                </button>
                            </div>

                            <div id="modules-container" class="space-y-4">
                                <!-- Modules loaded dynamically -->
                            </div>

                            <div id="no-modules" class="hidden text-center py-12 bg-white rounded-3xl border-2 border-dashed border-surface-variant/50">
                                <span class="material-symbols-outlined text-5xl text-on-surface/20 mb-3 block">folder_open</span>
                                <h3 class="text-lg font-bold text-on-surface/60">Sin módulos aún</h3>
                                <p class="text-sm text-on-surface/40 mt-1">Haz clic en "Agregar Módulo" para comenzar a estructurar el curso.</p>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 3: Publish -->
                    <div id="panel-publish" class="builder-panel hidden">
                        <div class="bg-white rounded-3xl border border-surface-variant p-8 shadow-sm space-y-8">
                            <h3 class="text-xl font-bold text-primary">Resumen del Curso</h3>
                            <div id="publish-summary" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <!-- Filled dynamically -->
                            </div>
                            <div class="border-t border-surface-variant pt-6 space-y-4">
                                <label class="text-sm font-bold ml-1">Estado del Curso</label>
                                <div class="flex gap-3">
                                    <button onclick="window.publishCourse('draft')" id="btn-draft" class="flex-1 py-4 border-2 border-surface-variant rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-amber-400 hover:text-amber-600 transition-all">
                                        <span class="material-symbols-outlined text-lg">edit_note</span> Guardar como Borrador
                                    </button>
                                    <button onclick="window.publishCourse('published')" id="btn-publish" class="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20">
                                        <span class="material-symbols-outlined text-lg">publish</span> Publicar Curso
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lesson Editor Modal -->
            <div id="lesson-modal" class="hidden fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                <div class="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-surface-variant">
                    <div class="flex justify-between items-center mb-6">
                        <h3 id="lesson-modal-title" class="text-2xl font-headline font-bold text-primary">Nueva Lección</h3>
                        <button onclick="window.closeLessonModal()" class="p-2 hover:bg-surface-variant rounded-full transition-all">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <form id="lesson-form" class="space-y-5">
                        <input type="hidden" id="lesson-id">
                        <input type="hidden" id="lesson-module-id">
                        <div class="space-y-2">
                            <label class="text-sm font-bold ml-1">Título de la Lección *</label>
                            <input type="text" id="lesson-title" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" required placeholder="Ej: Introducción al tema">
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-2">
                                <label class="text-sm font-bold ml-1">Tipo de Contenido</label>
                                <select id="lesson-type" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                                    <option value="text">📝 Texto</option>
                                    <option value="video">🎬 Video</option>
                                    <option value="pdf">📄 PDF</option>
                                </select>
                            </div>
                            <div class="space-y-2">
                                <label class="text-sm font-bold ml-1">Duración</label>
                                <input type="text" id="lesson-duration" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: 15min">
                            </div>
                        </div>
                        <div id="lesson-file-container" class="hidden space-y-2">
                            <label class="text-sm font-bold ml-1 text-secondary">Archivo del curso (PDFs, Docs)</label>
                            <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-secondary/30 rounded-2xl bg-secondary/5 hover:bg-secondary/10 cursor-pointer transition-all group">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <span class="material-symbols-outlined text-secondary text-3xl mb-2 group-hover:scale-110 transition-transform">cloud_upload</span>
                                    <p id="lesson-file-name" class="text-sm text-secondary font-bold">Haz clic para subir un archivo</p>
                                    <p class="text-xs text-secondary/60 mt-1">Máximo 50MB (PDF, DOCX, ZIP)</p>
                                </div>
                                <input id="lesson-file" type="file" class="hidden" accept=".pdf,.docx,.zip,.doc" />
                            </label>
                        </div>
                        <div id="lesson-content-container" class="space-y-2">
                            <label class="text-sm font-bold ml-1">Contenido (URL o texto)</label>
                            <textarea id="lesson-content" rows="4" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="URL del video, URL del PDF, o escribe el contenido de texto..."></textarea>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold ml-1 text-secondary">Video de Intérprete LSC (Opcional)</label>
                            <div class="flex gap-2">
                                <div class="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center shrink-0">
                                    <span class="material-symbols-outlined text-lg">back_hand</span>
                                </div>
                                <input type="url" id="lesson-lsc-url" class="flex-1 bg-secondary/5 border border-secondary/20 rounded-2xl px-4 py-2 text-sm focus:ring-2 focus:ring-secondary/20 outline-none transition-all" placeholder="URL embebida del intérprete (YouTube/Vimeo)">
                            </div>
                        </div>
                        <div class="flex gap-3 pt-2">
                            <button type="button" onclick="window.closeLessonModal()" class="flex-1 py-3 border border-surface-variant rounded-2xl font-bold hover:bg-surface-variant transition-all">Cancelar</button>
                            <button type="submit" class="flex-1 py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all">Guardar Lección</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        // State
        let currentCourseId = null;
        let currentModules = [];

        // --- Tab Switching ---
        window.switchBuilderTab = (tab) => {
            document.querySelectorAll('.builder-tab').forEach(t => {
                t.classList.remove('bg-white', 'text-primary', 'shadow-sm');
                t.classList.add('text-on-surface/50');
            });
            document.getElementById(`tab-${tab}`).classList.add('bg-white', 'text-primary', 'shadow-sm');
            document.getElementById(`tab-${tab}`).classList.remove('text-on-surface/50');

            document.querySelectorAll('.builder-panel').forEach(p => p.classList.add('hidden'));
            document.getElementById(`panel-${tab}`).classList.remove('hidden');

            if (tab === 'content') loadModules();
            if (tab === 'publish') loadPublishSummary();
        };

        // --- Course Builder Open/Close ---
        window.openCourseBuilder = async (id = null) => {
            const builder = document.getElementById('course-builder');
            builder.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (id) {
                const course = DB.getCourses().find(c => c.id === id);
                if (course) {
                    currentCourseId = course.id;
                    document.getElementById('builder-title').innerText = 'Editar Curso';
                    document.getElementById('course-id').value = course.id;
                    document.getElementById('course-title').value = course.title || '';
                    document.getElementById('course-description').value = course.description || '';
                    document.getElementById('course-category').value = course.category || 'Laboral';
                    document.getElementById('course-duration').value = course.duration || '';
                    document.getElementById('course-level').value = course.level || 'Accesibilidad AAA';
                    document.getElementById('course-img').value = course.img || '';
                }
            } else {
                currentCourseId = null;
                document.getElementById('builder-title').innerText = 'Nuevo Curso';
                document.getElementById('course-info-form').reset();
                document.getElementById('course-id').value = '';
            }
            window.switchBuilderTab('info');
        };

        window.closeCourseBuilder = () => {
            document.getElementById('course-builder').classList.add('hidden');
            document.body.style.overflow = '';
            // Refresh the page to show updates
            window.location.hash = '#/admin/cursos';
            location.reload();
        };

        // --- Save Course Info ---
        document.getElementById('course-info-form').onsubmit = async (e) => {
            e.preventDefault();
            const course = {
                id: document.getElementById('course-id').value ? parseInt(document.getElementById('course-id').value) : null,
                title: document.getElementById('course-title').value,
                description: document.getElementById('course-description').value,
                category: document.getElementById('course-category').value,
                duration: document.getElementById('course-duration').value,
                level: document.getElementById('course-level').value,
                img: document.getElementById('course-img').value || 'https://via.placeholder.com/800x600',
                status: 'draft'
            };

            try {
                const result = await DB.saveCourse(course);
                if (!currentCourseId && result && result[0]) {
                    currentCourseId = result[0].id;
                    document.getElementById('course-id').value = currentCourseId;
                }
                if (course.id) currentCourseId = course.id;
                
                // Show success feedback
                const btn = e.target.querySelector('button[type="submit"]');
                const origText = btn.innerHTML;
                btn.innerHTML = '<span class="material-symbols-outlined text-lg">check</span> ¡Guardado!';
                btn.classList.add('bg-secondary');
                setTimeout(() => { btn.innerHTML = origText; btn.classList.remove('bg-secondary'); }, 2000);
            } catch (error) {
                alert('Error al guardar: ' + error.message);
            }
        };

        // --- Load Modules ---
        async function loadModules() {
            if (!currentCourseId) {
                document.getElementById('content-needs-save').classList.remove('hidden');
                document.getElementById('content-editor').classList.add('hidden');
                return;
            }
            document.getElementById('content-needs-save').classList.add('hidden');
            document.getElementById('content-editor').classList.remove('hidden');

            currentModules = await DB.fetchCourseContent(currentCourseId);
            renderModules();
        }

        function renderModules() {
            const container = document.getElementById('modules-container');
            const noModules = document.getElementById('no-modules');

            if (currentModules.length === 0) {
                container.innerHTML = '';
                noModules.classList.remove('hidden');
                return;
            }
            noModules.classList.add('hidden');

            container.innerHTML = currentModules.map((mod, mi) => `
                <div class="bg-white rounded-2xl border border-surface-variant shadow-sm overflow-hidden">
                    <div class="flex items-center justify-between px-6 py-4 bg-surface/30 border-b border-surface-variant/50">
                        <div class="flex items-center gap-3">
                            <span class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-black">${mi + 1}</span>
                            <span class="font-bold text-primary">${mod.title}</span>
                            <span class="text-[10px] font-bold text-on-surface/30 uppercase tracking-wider">${(mod.lessons || []).length} lecciones</span>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="window.addLesson(${mod.id})" class="p-2 bg-surface hover:bg-secondary hover:text-white text-secondary rounded-lg transition-all text-sm" title="Agregar Lección">
                                <span class="material-symbols-outlined text-lg">add_circle</span>
                            </button>
                            <button onclick="window.deleteModuleConfirm(${mod.id})" class="p-2 bg-surface hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-all text-sm" title="Eliminar Módulo">
                                <span class="material-symbols-outlined text-lg">delete</span>
                            </button>
                        </div>
                    </div>
                    <div class="divide-y divide-surface-variant/30">
                        ${(mod.lessons || []).length === 0 ? `
                            <div class="px-6 py-6 text-center text-sm text-on-surface/30 italic">
                                Sin lecciones. Haz clic en <strong>+</strong> para agregar una.
                            </div>
                        ` : (mod.lessons || []).map((lesson, li) => `
                            <div class="flex items-center justify-between px-6 py-3 hover:bg-surface/20 transition-colors group">
                                <div class="flex items-center gap-4">
                                    <span class="text-xs font-bold text-on-surface/20 w-6">${mi + 1}.${li + 1}</span>
                                    <span class="material-symbols-outlined text-lg ${lesson.content_type === 'video' ? 'text-red-400' : lesson.content_type === 'pdf' ? 'text-blue-400' : 'text-on-surface/30'}">
                                        ${lesson.content_type === 'video' ? 'play_circle' : lesson.content_type === 'pdf' ? 'picture_as_pdf' : 'article'}
                                    </span>
                                    <div>
                                        <span class="font-medium text-sm text-on-surface/80">${lesson.title}</span>
                                        ${lesson.duration ? `<span class="text-[10px] text-on-surface/30 ml-2">${lesson.duration}</span>` : ''}
                                    </div>
                                </div>
                                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onclick="window.editLesson(${mod.id}, ${lesson.id})" class="p-1.5 hover:bg-primary hover:text-white text-primary rounded-lg transition-all" title="Editar">
                                        <span class="material-symbols-outlined text-base">edit</span>
                                    </button>
                                    <button onclick="window.deleteLessonConfirm(${lesson.id})" class="p-1.5 hover:bg-red-500 hover:text-white text-red-400 rounded-lg transition-all" title="Eliminar">
                                        <span class="material-symbols-outlined text-base">close</span>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
        }

        // --- Module Actions ---
        window.addModule = async () => {
            const title = prompt('Nombre del módulo:');
            if (!title) return;
            try {
                await DB.saveModule({ course_id: currentCourseId, title, position: currentModules.length });
                await loadModules();
            } catch (e) { alert('Error: ' + e.message); }
        };

        window.deleteModuleConfirm = async (id) => {
            if (confirm('¿Eliminar este módulo y todas sus lecciones?')) {
                try { await DB.deleteModule(id); await loadModules(); }
                catch (e) { alert('Error: ' + e.message); }
            }
        };

        // --- Lesson Actions ---
        window.addLesson = (moduleId) => {
            document.getElementById('lesson-modal-title').innerText = 'Nueva Lección';
            document.getElementById('lesson-form').reset();
            document.getElementById('lesson-id').value = '';
            document.getElementById('lesson-module-id').value = moduleId;
            updateLessonUI('text');
            document.getElementById('lesson-modal').classList.remove('hidden');
        };

        window.editLesson = async (moduleId, lessonId) => {
            const mod = currentModules.find(m => m.id === moduleId);
            const lesson = mod?.lessons?.find(l => l.id === lessonId);
            if (!lesson) return;

            document.getElementById('lesson-modal-title').innerText = 'Editar Lección';
            document.getElementById('lesson-id').value = lesson.id;
            document.getElementById('lesson-module-id').value = moduleId;
            document.getElementById('lesson-title').value = lesson.title;
            document.getElementById('lesson-type').value = lesson.content_type || 'text';
            document.getElementById('lesson-duration').value = lesson.duration || '';
            document.getElementById('lesson-content').value = lesson.content || '';
            document.getElementById('lesson-lsc-url').value = lesson.lsc_video_url || '';
            
            // Trigger type change logic
            updateLessonUI(lesson.content_type || 'text');
            document.getElementById('lesson-modal').classList.remove('hidden');
        };

        function updateLessonUI(type) {
            const fileContainer = document.getElementById('lesson-file-container');
            if (type === 'pdf') {
                fileContainer.classList.remove('hidden');
            } else {
                fileContainer.classList.add('hidden');
            }
        }

        // Logic for type change
        document.body.addEventListener('change', (e) => {
            if (e.target.id === 'lesson-type') {
                updateLessonUI(e.target.value);
            }
            if (e.target.id === 'lesson-file') {
                const fileName = e.target.files[0]?.name || 'Haz clic para subir un archivo';
                document.getElementById('lesson-file-name').innerText = fileName;
                document.getElementById('lesson-file-name').classList.add('text-primary');
            }
        });

        window.closeLessonModal = () => {
            document.getElementById('lesson-modal').classList.add('hidden');
        };

        window.deleteLessonConfirm = async (id) => {
            if (confirm('¿Eliminar esta lección?')) {
                try { await DB.deleteLesson(id); await loadModules(); }
                catch (e) { alert('Error: ' + e.message); }
            }
        };

        document.getElementById('lesson-form').onsubmit = async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const origText = btn.innerHTML;
            
            const moduleId = parseInt(document.getElementById('lesson-module-id').value);
            const mod = currentModules.find(m => m.id === moduleId);
            const fileInput = document.getElementById('lesson-file');
            const contentType = document.getElementById('lesson-type').value;
            let content = document.getElementById('lesson-content').value;

            try {
                // If PDF and file selected, upload it
                if (contentType === 'pdf' && fileInput.files.length > 0) {
                    btn.disabled = true;
                    btn.innerHTML = '<span class="material-symbols-outlined animate-spin text-lg">sync</span> Subiendo...';
                    
                    const fileUrl = await DB.uploadFile(fileInput.files[0]);
                    content = fileUrl; // Use the URL as content
                }

                const lesson = {
                    id: document.getElementById('lesson-id').value ? parseInt(document.getElementById('lesson-id').value) : null,
                    module_id: moduleId,
                    title: document.getElementById('lesson-title').value,
                    content_type: contentType,
                    content: content,
                    lsc_video_url: document.getElementById('lesson-lsc-url').value,
                    duration: document.getElementById('lesson-duration').value,
                    position: mod?.lessons?.length || 0
                };

                await DB.saveLesson(lesson);
                window.closeLessonModal();
                await loadModules();
            } catch (e) { 
                alert('Error: ' + e.message); 
            } finally {
                btn.disabled = false;
                btn.innerHTML = origText;
            }
        };

        // --- Publish Tab ---
        async function loadPublishSummary() {
            const course = DB.getCourses().find(c => c.id === currentCourseId);
            if (!course) {
                document.getElementById('publish-summary').innerHTML = '<p class="col-span-4 text-center text-on-surface/40">Guarda primero la información del curso.</p>';
                return;
            }
            const modules = await DB.fetchCourseContent(currentCourseId);
            const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

            document.getElementById('publish-summary').innerHTML = `
                <div class="bg-surface-variant/30 p-5 rounded-2xl text-center">
                    <p class="text-2xl font-black text-primary">${modules.length}</p>
                    <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-wider mt-1">Módulos</p>
                </div>
                <div class="bg-surface-variant/30 p-5 rounded-2xl text-center">
                    <p class="text-2xl font-black text-secondary">${totalLessons}</p>
                    <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-wider mt-1">Lecciones</p>
                </div>
                <div class="bg-surface-variant/30 p-5 rounded-2xl text-center">
                    <p class="text-2xl font-black text-accent">${course.duration || '--'}</p>
                    <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-wider mt-1">Duración</p>
                </div>
                <div class="bg-surface-variant/30 p-5 rounded-2xl text-center">
                    <p class="text-2xl font-black ${course.status === 'published' ? 'text-emerald-600' : 'text-amber-500'}">${course.status === 'published' ? '✅' : '📝'}</p>
                    <p class="text-[10px] font-bold text-on-surface/40 uppercase tracking-wider mt-1">${course.status === 'published' ? 'Publicado' : 'Borrador'}</p>
                </div>
            `;
        }

        window.publishCourse = async (status) => {
            if (!currentCourseId) return alert('Guarda la información del curso primero.');
            try {
                await DB.saveCourse({ id: currentCourseId, status });
                await loadPublishSummary();
                alert(status === 'published' ? '¡Curso publicado exitosamente!' : 'Curso guardado como borrador.');
            } catch (e) { alert('Error: ' + e.message); }
        };

        // --- Delete Course ---
        window.deleteCourse = async (id) => {
            if (confirm('¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.')) {
                try { await DB.deleteCourse(id); location.reload(); }
                catch (e) { alert('Error al eliminar: ' + e.message); }
            }
        };
    }
};
