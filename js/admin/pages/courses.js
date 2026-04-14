// Admin Courses Management Page
import { DB } from '../data.js';

export const AdminCourses = {
    render: async () => {
        const courses = DB.getCourses();

        return `
        <div class="space-y-8 animate-in fade-in duration-500 pb-12">
            <header class="flex justify-between items-center bg-white p-8 rounded-[2rem] border border-surface-variant">
                <div>
                    <h2 class="text-3xl font-headline font-bold text-primary">Gestión de Cursos</h2>
                    <p class="text-on-surface/60">Administra el catálogo educativo de la plataforma.</p>
                </div>
                <button onclick="window.showCourseModal()" class="bg-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                    <span class="material-symbols-outlined">add</span> Nuevo Curso
                </button>
            </header>

            <!-- Course Table/List -->
            <div class="bg-white rounded-[2rem] border border-surface-variant overflow-hidden shadow-sm">
                <table class="w-full text-left">
                    <thead class="bg-surface-variant/30 border-b border-surface-variant">
                        <tr>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Curso</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Categoría</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Estado</th>
                            <th class="px-8 py-4 text-xs font-bold uppercase tracking-widest text-on-surface/50">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-surface-variant">
                        ${courses.map(course => `
                        <tr class="hover:bg-surface/50 transition-colors group">
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-surface-variant">
                                        <img src="${course.img}" class="w-full h-full object-cover">
                                    </div>
                                    <div>
                                        <p class="font-bold text-primary">${course.title}</p>
                                        <p class="text-[10px] text-on-surface/40 uppercase tracking-widest">${course.duration} | ${course.level}</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-primary/10">${course.category}</span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-2">
                                    <span class="w-2 h-2 rounded-full ${course.status === 'published' ? 'bg-secondary' : 'bg-on-surface/20'}"></span>
                                    <span class="text-sm font-medium ${course.status === 'published' ? 'text-secondary' : 'text-on-surface/40'}">
                                        ${course.status === 'published' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex gap-2">
                                    <button onclick="window.editCourse(${course.id})" class="p-2 hover:bg-primary/10 text-primary rounded-lg transition-all" title="Editar">
                                        <span class="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                    <button onclick="window.deleteCourse(${course.id})" class="p-2 hover:bg-accent/10 text-accent rounded-lg transition-all" title="Eliminar">
                                        <span class="material-symbols-outlined text-xl">delete</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Modal for Course CRUD (Simplified version) -->
            <div id="course-modal" class="hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                <div class="bg-white rounded-[3rem] p-10 max-w-2xl w-full shadow-2xl border border-surface-variant animate-in zoom-in duration-300">
                    <div class="flex justify-between items-center mb-8">
                        <h3 id="modal-title" class="text-3xl font-headline font-bold text-primary">Crear Nuevo Curso</h3>
                        <button onclick="window.closeCourseModal()" class="p-2 hover:bg-surface-variant rounded-full transition-all">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <form id="course-form" class="space-y-6">
                        <input type="hidden" id="course-id">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="text-sm font-bold ml-1">Título del Curso</label>
                                <input type="text" id="course-title" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" required placeholder="Ej: Liderazgo Digital">
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
                                <label class="text-sm font-bold ml-1">Duración</label>
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
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold ml-1">Imagen URL</label>
                            <input type="url" id="course-img" class="w-full bg-surface-variant/30 border border-surface-variant rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="https://...">
                        </div>

                        <div class="flex gap-4 pt-4">
                            <button type="button" onclick="window.closeCourseModal()" class="flex-1 py-4 border border-surface-variant rounded-2xl font-bold hover:bg-surface-variant transition-all">Cancelar</button>
                            <button type="submit" class="flex-1 py-4 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-all">Guardar Curso</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        const modal = document.getElementById('course-modal');
        const form = document.getElementById('course-form');

        window.showCourseModal = (id = null) => {
            modal.classList.remove('hidden');
            if (!id) {
                document.getElementById('modal-title').innerText = 'Crear Nuevo Curso';
                form.reset();
                document.getElementById('course-id').value = '';
            }
        };

        window.closeCourseModal = () => {
            modal.classList.add('hidden');
        };

        window.editCourse = (id) => {
            const course = DB.getCourses().find(c => c.id === id);
            if (course) {
                document.getElementById('modal-title').innerText = 'Editar Curso';
                document.getElementById('course-id').value = course.id;
                document.getElementById('course-title').value = course.title;
                document.getElementById('course-category').value = course.category;
                document.getElementById('course-duration').value = course.duration;
                document.getElementById('course-level').value = course.level;
                document.getElementById('course-img').value = course.img;
                modal.classList.remove('hidden');
            }
        };

        window.deleteCourse = (id) => {
            if (confirm('¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.')) {
                DB.deleteCourse(id);
                location.reload();
            }
        };

        form.onsubmit = (e) => {
            e.preventDefault();
            const course = {
                id: document.getElementById('course-id').value ? parseInt(document.getElementById('course-id').value) : null,
                title: document.getElementById('course-title').value,
                category: document.getElementById('course-category').value,
                duration: document.getElementById('course-duration').value,
                level: document.getElementById('course-level').value,
                img: document.getElementById('course-img').value || 'https://via.placeholder.com/800x600',
                status: 'published'
            };
            DB.saveCourse(course);
            location.reload();
        };
    }
};
