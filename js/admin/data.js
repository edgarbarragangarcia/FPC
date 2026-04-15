// Supabase Integration - Cloud Database for FPC LMS
const SUPABASE_URL = 'https://nhrgxyoqwrxoasbxqtjr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ocmd4eW9xd3J4b2FzYnhxdGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxOTM5NjQsImV4cCI6MjA5MTc2OTk2NH0.qh9buTEvnjdwZxYj0MltW6ju_9r-SHK6YG1x2RNgBFM';

// Initialize the Supabase client
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const DB = {
    // Current local cache for synchronous rendering if needed
    _courses: [],
    _users: [],
    _logs: [],

    init: async () => {
        console.log('Iniciando conexión con Supabase...');
        // We will fetch initial data
        await DB.fetchCourses();
        await DB.fetchUsers();
        await DB.fetchLogs();
    },

    // --- Courses ---
    fetchCourses: async () => {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
        DB._courses = data;
        return data;
    },

    getCourses: () => DB._courses,

    saveCourse: async (course) => {
        let result;
        if (course.id) {
            // Update
            result = await supabase
                .from('courses')
                .update(course)
                .eq('id', course.id);
        } else {
            // Create - omit ID for GENERATED ALWAYS AS IDENTITY
            const { id, ...courseData } = course;
            result = await supabase
                .from('courses')
                .insert([courseData]);
        }

        if (result.error) throw result.error;
        await DB.log(`Curso gestionado: ${course.title}`);
        await DB.fetchCourses(); // Sync cache
        return result.data;
    },

    deleteCourse: async (id) => {
        const { error } = await supabase
            .from('courses')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        await DB.log(`Curso eliminado (ID: ${id})`);
        await DB.fetchCourses();
    },

    // --- Users ---
    fetchUsers: async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*');
        
        if (error) {
            console.error('Error fetching users:', error);
            return [];
        }
        DB._users = data;
        return data;
    },

    getUsers: () => DB._users,

    // --- Logs ---
    fetchLogs: async () => {
        const { data, error } = await supabase
            .from('logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
        
        if (error) return [];
        DB._logs = data;
        return data;
    },

    getLogs: () => DB._logs,

    log: async (message) => {
        await supabase
            .from('logs')
            .insert([{ message }]);
        await DB.fetchLogs();
    },

    // --- Student Enrollments ---
    fetchUserEnrollments: async (userId) => {
        const { data, error } = await supabase
            .from('enrollments')
            .select(`
                *,
                courses (*)
            `)
            .eq('profile_id', userId);
        
        if (error) {
            console.error('Error fetching enrollments:', error);
            return [];
        }
        return data;
    },

    // --- Modules ---
    fetchModules: async (courseId) => {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('course_id', courseId)
            .order('position', { ascending: true });
        
        if (error) { console.error('Error fetching modules:', error); return []; }
        return data;
    },

    saveModule: async (mod) => {
        let result;
        if (mod.id) {
            result = await supabase.from('modules').update(mod).eq('id', mod.id);
        } else {
            const { id, ...modData } = mod;
            result = await supabase.from('modules').insert([modData]).select();
        }
        if (result.error) throw result.error;
        return result.data;
    },

    deleteModule: async (id) => {
        const { error } = await supabase.from('modules').delete().eq('id', id);
        if (error) throw error;
    },

    // --- Lessons ---
    fetchLessons: async (moduleId) => {
        const { data, error } = await supabase
            .from('lessons')
            .select('*')
            .eq('module_id', moduleId)
            .order('position', { ascending: true });
        
        if (error) { console.error('Error fetching lessons:', error); return []; }
        return data;
    },

    saveLesson: async (lesson) => {
        let result;
        if (lesson.id) {
            result = await supabase.from('lessons').update(lesson).eq('id', lesson.id);
        } else {
            const { id, ...lessonData } = lesson;
            result = await supabase.from('lessons').insert([lessonData]).select();
        }
        if (result.error) throw result.error;
        return result.data;
    },

    deleteLesson: async (id) => {
        const { error } = await supabase.from('lessons').delete().eq('id', id);
        if (error) throw error;
    },

    // --- Full Course Content (modules + lessons) ---
    fetchCourseContent: async (courseId) => {
        const modules = await DB.fetchModules(courseId);
        for (const mod of modules) {
            mod.lessons = await DB.fetchLessons(mod.id);
        }
        return modules;
    }
};

/**
 * SQL SCHEMA FOR SUPABASE DASHBOARD:
 * 
 * create table courses (
 *   id bigint primary key generated always as identity,
 *   title text not null,
 *   description text,
 *   level text,
 *   duration text,
 *   category text,
 *   img text,
 *   status text default 'published',
 *   created_at timestamp with time zone default now()
 * );
 * 
 * create table profiles (
 *   id bigint primary key generated always as identity,
 *   name text,
 *   email text unique,
 *   role text default 'student',
 *   avatar text,
 *   created_at timestamp with time zone default now()
 * );
 * 
 * create table logs (
 *   id bigint primary key generated always as identity,
 *   message text,
 *   created_at timestamp with time zone default now()
 * );
 */
