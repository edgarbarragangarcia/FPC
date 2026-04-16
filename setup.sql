-- ============================================
-- FPC LMS - Supabase Database Schema
-- Copia y pega TODO este código en el SQL Editor de tu Dashboard de Supabase
-- ============================================

-- 1. Tabla de Cursos
CREATE TABLE IF NOT EXISTS courses (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    level TEXT,
    duration TEXT,
    category TEXT,
    img TEXT,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabla de Perfiles de Usuario (UUID para compatibilidad con Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Tabla de Módulos (Course Builder)
CREATE TABLE IF NOT EXISTS modules (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    position INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabla de Lecciones (Course Builder)
CREATE TABLE IF NOT EXISTS lessons (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    module_id BIGINT REFERENCES modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_type TEXT DEFAULT 'text',
    content TEXT,
    duration TEXT,
    position INT DEFAULT 0,
    lsc_video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Datos Iniciales (Seed)
-- Nota: Los seeds de profiles y enrollments se omiten porque profiles usa UUID
-- y los IDs no son predecibles. Puedes agregarlos manualmente después.
INSERT INTO courses (title, level, duration, category, img)
VALUES 
('Liderazgo Empático', 'Accesibilidad AAA', '12h', 'Laboral', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMTJH8dbnMCwZe3P5hXyrvwXTglZkdnH3Xv_WEb-Z-J78s4WfRPq9ECpTLFBqO6hBclnn6LVzDqJOEQHeXGkcu978LySNe8ARN-p2Avf2LlxjtEA8lT-qhQaxvadE3IUKG5AINm-RPwwGTBYEKq0Rk-FcsbC3ZyUQ-9mbntNAmL6DlL4Hq8vElxvOfm0KuGGjL-P0nIkOgSK43CXVh96lewEHl_x6KbilKk1lVapVS9ZiBsNv1v0wbzK8Zfcf2fByS9UcDjy0DeE2L'),
('Introducción al Braille Digital', 'Visual Focus', '20h', 'Tecnología', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZNvaOh3E9Ond6UnB7yMU84nt6E0BXVuBAHSN1CK710aBie79qf1a9Vm4b_nz86hQmrrNK3KqqYU20UTpyOxA9kfWrvbidFSsRDA0V62F3aELe_Lr5_pHoPiGFN3KAnH_um2mf2Cmpf7icVX831g_o1YevXmqqOV5dk9dOb1w9uySAEQSN7qNYeTEWFAMmtVw3PiRHh7ebN9aiwCC6mWBXtWAwSmhHHI8z4LEwFxPv58YjgujBB-S22d8A8rxlO0jCZrOEFhaHMn8'),
('Emprendimiento Inclusivo', 'Cognitivo Adaptado', '15h', 'Negocios', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCicB8UDykP_ofYUn7VxMkqrz3Ml6P_R7D54GE5VyI7XjxP1QMzTvECnnL9-N5APo3383NGUZmDT-0BWcp6g1VtLS1-AHteLHyOhFr1rri-XMW9P-lwJxFhK5vaDFmc3G0co0dwO8rpnNGKCjQPez15XyvXdNA-RNhnaX5SHFYca3B3_hmTi4pkPs_3mcGHsfHBlmMPg9BDeTJ98xEHnj5yUlj0Xr--Xy4YKWOselGzajSNp4MEqwG4Ic7OrcCS52lop-ZjyO2Gey9b')
ON CONFLICT DO NOTHING;

INSERT INTO logs (message) VALUES ('Base de datos inicializada correctamente');
