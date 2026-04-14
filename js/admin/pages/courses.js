// Admin Courses Management Page
import { DB } from '../data.js';

export const AdminCourses = {
    render: async () => {
        const courses = DB.getCourses();

        return `
        <div class="space-y-8 animate-in fade-in duration-700 pb-12">
            <!-- Premium Header with Gradient & Glassmorphism -->
            <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                    <h2 class="text-4xl font-headline font-extrabold tracking-tight">Gestión de Cursos</h2>
                    <p class="text-white/80 text-lg font-medium">Administra el catálogo educativo de la plataforma.</p>
                </div>
                
                <button onclick="window.showCourseModal()" class="relative z-10 bg-white/10 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <span class="material-symbols-outlined font-light text-[22px]">add</span> 
                    <span>Nuevo Curso</span>
                </button>
            </header>

            <!-- Data Table Container with Glassmorphism -->
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
                                        <img src="${course.img}" class="w-full h-full object-cover">
                                    </div>
                                    <div class="flex flex-col">
                                        <span class="font-extrabold text-primary text-base group-hover:text-[#0052b4] transition-colors">${course.title}</span>
                                        <span class="text-xs text-on-surface/40 font-medium tracking-wide mt-0.5">${course.duration} &bull; ${course.level}</span>
                                    </div>
                                </div>
                            </td>
                            <td class="px-8 py-6">
                                <span class="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border bg-surface text-primary border-surface-variant/50 shadow-sm">
                                    ${course.category}
                                </span>
                            </td>
                            <td class="px-8 py-6">
                                <div class="flex items-center gap-2">
                                    <div class="relative flex items-center justify-center">
                                        <span class="w-2.5 h-2.5 rounded-full ${course.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'} shadow-sm"></span>
                                        ${course.status === 'published' ? '<span class="absolute w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75"></span>' : ''}
                                    </div>
                                    <span class="text-xs font-bold uppercase tracking-wider ${course.status === 'published' ? 'text-emerald-700' : 'text-amber-700'}">
                                        ${course.status === 'published' ? 'Publicado' : 'Borrador'}
                                    </span>
                                </div>
                            </td>
                            <td class="px-8 py-6 text-right">
                                <div class="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                    <button onclick="window.editCourse(${course.id})" class="p-2.5 bg-surface hover:bg-primary hover:text-white text-primary rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" title="Editar">
                                        <span class="material-symbols-outlined text-xl">edit</span>
                                    </button>
                                    <button onclick="window.deleteCourse(${course.id})" class="p-2.5 bg-surface hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" title="Eliminar">
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

        window.deleteCourse = async (id) => {
            if (confirm('¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.')) {
                try {
                    await DB.deleteCourse(id);
                    location.reload();
                } catch(e) {
                    alert('Error al eliminar: ' + e.message);
                }
            }
        };

        form.onsubmit = async (e) => {
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
            
            try {
                await DB.saveCourse(course);
                location.reload();
            } catch(error) {
                alert('Error al guardar: ' + error.message);
            }
        };
    }
};
