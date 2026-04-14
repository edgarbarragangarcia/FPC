// LMS Data Layer - Simulated Database with LocalStorage

const STORAGE_KEYS = {
    COURSES: 'fpc_courses',
    USERS: 'fpc_users',
    LOG: 'fpc_audit_log',
    COLLECTIONS: 'fpc_collections'
};

const SEED_DATA = {
    COURSES: [
        { id: 1, title: 'Liderazgo Empático', level: 'Accesibilidad AAA', duration: '12h', category: 'Laboral', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTJH8dbnMCwZe3P5hXyrvwXTglZkdnH3Xv_WEb-Z-J78s4WfRPq9ECpTLFBqO6hBclnn6LVzDqJOEQHeXGkcu978LySNe8ARN-p2Avf2LlxjtEA8lT-qhQaxvadE3IUKG5AINm-RPwwGTBYEKq0Rk-FcsbC3ZyUQ-9mbntNAmL6DlL4Hq8vElxvOfm0KuGGjL-P0nIkOgSK43CXVh96lewEHl_x6KbilKk1lVapVS9ZiBsNv1v0wbzK8Zfcf2fByS9UcDjy0DeE2L', status: 'published' },
        { id: 2, title: 'Introducción al Braille Digital', level: 'Visual Focus', duration: '20h', category: 'Tecnología', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZNvaOh3E9Ond6UnB7yMU84nt6E0BXVuBAHSN1CK710aBie79qf1a9Vm4b_nz86hQmrrNK3KqqYU20UTpyOxA9kfWrvbidFSsRDA0V62F3aELe_Lr5_pHoPiGFN3KAnH_um2mf2Cmpf7icVX831g_o1YevXmqqOV5dk9dOb1w9uySAEQSN7qNYeTEWFAMmtVw3PiRHh7ebN9aiwCC6mWBXtWAwSmhHHI8z4LEwFxPv58YjgujBB-S22d8A8rxlO0jCZrOEFhaHMn8', status: 'published' },
        { id: 3, title: 'Emprendimiento Inclusivo', level: 'Cognitivo Adaptado', duration: '15h', category: 'Negocios', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCicB8UDykP_ofYUn7VxMkqrz3Ml6P_R7D54GE5VyI7XjxP1QMzTvECnnL9-N5APo3383NGUZmDT-0BWcp6g1VtLS1-AHteLHyOhFr1rri-XMW9P-lwJxFhK5vaDFmc3G0co0dwO8rpnNGKCjQPez15XyvXdNA-RNhnaX5SHFYca3B3_hmTi4pkPs_3mcGHsfHBlmMPg9BDeTJ98xEHnj5yUlj0Xr--Xy4YKWOselGzajSNp4MEqwG4Ic7OrcCS52lop-ZjyO2Gey9b', status: 'published' }
    ],
    USERS: [
        { id: 1, name: 'Administrador FPC', email: 'admin@fpc.org', role: 'admin', avatar: 'https://ui-avatars.com/api/?name=Admin+FPC&background=003F87&color=fff' },
        { id: 2, name: 'Juan Perez', email: 'juan@test.com', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=1B6D24&color=fff' }
    ]
};

export const DB = {
    init: () => {
        if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
            localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(SEED_DATA.COURSES));
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_DATA.USERS));
        }
    },

    // Course CRUD
    getCourses: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]'),
    saveCourse: (course) => {
        const courses = DB.getCourses();
        if (course.id) {
            const index = courses.findIndex(c => c.id === course.id);
            courses[index] = { ...courses[index], ...course };
        } else {
            course.id = Date.now();
            courses.push(course);
        }
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
        DB.log(`Curso ${course.id ? 'actualizado' : 'creado'}: ${course.title}`);
        return course;
    },
    deleteCourse: (id) => {
        const courses = DB.getCourses().filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
        DB.log(`Curso eliminado ID: ${id}`);
    },

    // User CRUD
    getUsers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
    saveUser: (user) => {
        const users = DB.getUsers();
        if (user.id) {
            const index = users.findIndex(u => u.id === user.id);
            users[index] = { ...users[index], ...user };
        } else {
            user.id = Date.now();
            users.push(user);
        }
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return user;
    },

    // Logger
    log: (message) => {
        const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOG) || '[]');
        logs.unshift({ id: Date.now(), message, date: new Date().toISOString() });
        localStorage.setItem(STORAGE_KEYS.LOG, JSON.stringify(logs.slice(0, 50)));
    },
    getLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.LOG) || '[]')
};
