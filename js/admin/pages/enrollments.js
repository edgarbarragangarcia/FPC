// Admin Enrollments Management Page
import { DB } from '../data.js';

export const AdminEnrollments = {
    render: async () => {
        const enrollments = await DB.fetchAllEnrollments();

        return `
        <div class="h-full flex flex-col overflow-hidden animate-in fade-in duration-700">
            <!-- Fixed Header (Static) -->
            <div class="shrink-0 p-6 lg:p-12 pb-4">
                <header class="relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-primary to-[#0052b4] p-8 md:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-primary/30 text-white">
                    <div class="absolute top-0 right-0 w-64 h-64 bg-surface/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div class="relative z-10 space-y-2 mb-6 md:mb-0">
                        <h2 class="text-4xl font-headline font-extrabold tracking-tight">Gestión de Inscripciones</h2>
                        <p class="text-white/80 text-lg font-medium">Asigna y supervisa las matrículas de los estudiantes.</p>
                    </div>
                    <button class="relative z-10 bg-surface/10 hover:bg-surface text-white hover:text-primary backdrop-blur-md border border-white/30 px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <span class="material-symbols-outlined font-light text-[22px]">add</span> 
                        <span>Nueva Inscripción</span>
                    </button>
                </header>
            </div>

            <!-- Scrollable Body Section -->
            <div class="flex-1 overflow-y-auto p-6 lg:p-12 pt-0 custom-scrollbar">
                <div class="max-w-7xl mx-auto space-y-8 pb-12">
                    <!-- Data Table Container -->
                    <div class="bg-surface/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-x-auto shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <table class="min-w-full text-left border-collapse">
                            <thead class="bg-surface/40 border-b border-surface-variant/50">
                                <tr>
                                    <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Estudiante</th>
                                    <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Curso</th>
                                    <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Progreso</th>
                                    <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40">Estado</th>
                                    <th class="px-8 py-6 text-xs font-black uppercase tracking-[0.2em] text-on-surface/40 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-surface-variant/30">
                                ${enrollments.map((env, index) => `
                                <tr class="hover:bg-surface transition-all duration-300 group ${index % 2 === 0 ? 'bg-transparent' : 'bg-surface/10'}">
                                    <td class="px-8 py-6">
                                        <span class="font-extrabold text-primary text-base group-hover:text-[#0052b4] transition-colors">${env.profiles?.name || env.profiles?.email || 'N/A'}</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span class="text-xs font-bold text-on-surface/80 bg-surface px-3 py-1.5 rounded-lg border border-surface-variant/50 shadow-sm">${env.courses?.title || 'N/A'}</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <div class="w-full bg-surface-variant/50 rounded-full h-2.5 max-w-[120px] overflow-hidden">
                                          <div class="bg-secondary h-2.5 rounded-full shadow-inner" style="width: ${env.progress}%"></div>
                                        </div>
                                        <span class="text-[10px] font-bold mt-1 text-on-surface/50 uppercase tracking-wider">${env.progress}% Completado</span>
                                    </td>
                                    <td class="px-8 py-6">
                                        <span class="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.15em] border ${env.status === 'active' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'} shadow-sm">
                                            ${env.status === 'active' ? 'En Curso' : 'Graduado'}
                                        </span>
                                    </td>
                                    <td class="px-8 py-6 text-right">
                                        <div class="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                            <button onclick="window.deleteEnrollment(${env.course_id}, '${env.profile_id}')" class="p-2.5 bg-surface hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5" title="Eliminar">
                                                <span class="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `;
    },
    afterRender: async () => {
        window.deleteEnrollment = async (courseId, userId) => {
            UI.confirm('¿Borrar Inscripción?', 'Esta acción eliminará el registro de inscripción del alumno.', async () => {
                try {
                    const result = await DB.unenrollCourse(courseId, userId);
                    if (result.status === 'success') {
                        await DB.log(`Inscripción eliminada (Usuario: ${userId}, Curso: ${courseId})`);
                        location.reload();
                    }
                } catch (e) {
                    UI.alert('Error', 'No se pudo eliminar la inscripción: ' + e.message, 'error');
                }
            });
        };
    }
};
