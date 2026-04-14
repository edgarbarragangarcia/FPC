-- FPC LMS - Supabase Database Schema
-- Copia y pega este código en el SQL Editor de tu Dashboard de Supabase

-- 1. Tabla de Cursos
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    level TEXT,
    duration TEXT,
    category TEXT,
    img TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Perfiles de Usuario
CREATE TABLE IF NOT EXISTS profiles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'student',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla de Logs de Auditoría
CREATE TABLE IF NOT EXISTS logs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabla de Inscripciones (Enrollments)
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id BIGINT REFERENCES profiles(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Datos Iniciales (Seed)
INSERT INTO courses (title, level, duration, category, img)
VALUES 
('Liderazgo Empático', 'Accesibilidad AAA', '12h', 'Laboral', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTJH8dbnMCwZe3P5hXyrvwXTglZkdnH3Xv_WEb-Z-J78s4WfRPq9ECpTLFBqO6hBclnn6LVzDqJOEQHeXGkcu978LySNe8ARN-p2Avf2LlxjtEA8lT-qhQaxvadE3IUKG5AINm-RPwwGTBYEKq0Rk-FcsbC3ZyUQ-9mbntNAmL6DlL4Hq8vElxvOfm0KuGGjL-P0nIkOgSK43CXVh96lewEHl_x6KbilKk1lVapVS9ZiBsNv1v0wbzK8Zfcf2fByS9UcDjy0DeE2L'),
('Introducción al Braille Digital', 'Visual Focus', '20h', 'Tecnología', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZNvaOh3E9Ond6UnB7yMU84nt6E0BXVuBAHSN1CK710aBie79qf1a9Vm4b_nz86hQmrrNK3KqqYU20UTpyOxA9kfWrvbidFSsRDA0V62F3aELe_Lr5_pHoPiGFN3KAnH_um2mf2Cmpf7icVX831g_o1YevXmqqOV5dk9dOb1w9uySAEQSN7qNYeTEWFAMmtVw3PiRHh7ebN9aiwCC6mWBXtWAwSmhHHI8z4LEwFxPv58YjgujBB-S22d8A8rxlO0jCZrOEFhaHMn8'),
('Emprendimiento Inclusivo', 'Cognitivo Adaptado', '15h', 'Negocios', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCicB8UDykP_ofYUn7VxMkqrz3Ml6P_R7D54GE5VyI7XjxP1QMzTvECnnL9-N5APo3383NGUZmDT-0BWcp6g1VtLS1-AHteLHyOhFr1rri-XMW9P-lwJxFhK5vaDFmc3G0co0dwO8rpnNGKCjQPez15XyvXdNA-RNhnaX5SHFYca3B3_hmTi4pkPs_3mcGHsfHBlmMPg9BDeTJ98xEHnj5yUlj0Xr--Xy4YKWOselGzajSNp4MEqwG4Ic7OrcCS52lop-ZjyO2Gey9b');

INSERT INTO profiles (name, email, role, avatar)
VALUES 
('Administrador FPC', 'admin@fpc.org', 'admin', 'https://ui-avatars.com/api/?name=Admin+FPC&background=003F87&color=fff'),
('Juan Perez', 'juan@test.com', 'student', 'https://ui-avatars.com/api/?name=Juan+Perez&background=1B6D24&color=fff');

-- Inscripciones para Juan Perez (ID 2 típicamente en este seed)
-- Nota: En Supabase real los IDs pueden variar, esto es para referencia
INSERT INTO enrollments (profile_id, course_id, progress, status)
VALUES 
(2, 1, 45, 'active'),
(2, 2, 80, 'active');

INSERT INTO logs (message) VALUES ('Base de datos inicializada con tabla de inscripciones');
