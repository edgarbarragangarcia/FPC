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

-- 2. Tabla de Perfiles de Usuario (Vinculada a Supabase Auth)
-- Esta tabla se llena automáticamente mediante un Trigger cuando alguien se registra
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'student',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Función is_admin y creación automática de perfil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Borrar trigger si existe y crearlo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Tabla de Inscripciones (Enrollments)
CREATE TABLE IF NOT EXISTS enrollments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, course_id)
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

-- 7. Tabla de Materiales del Curso
CREATE TABLE IF NOT EXISTS course_materials (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    file_type TEXT DEFAULT 'pdf',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tabla de Logs de Auditoría
CREATE TABLE IF NOT EXISTS logs (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Habilitar Seguridad (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE logs ENABLE ROW LEVEL SECURITY;

-- 10. Políticas de Acceso (Policies)
DROP POLICY IF EXISTS "Courses are viewable by everyone" ON courses;
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on courses" ON courses FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can do everything on profiles" ON profiles FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can enroll themselves" ON enrollments FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can unenroll themselves" ON enrollments FOR DELETE USING (auth.uid() = profile_id);
CREATE POLICY "Admins can do everything on enrollments" ON enrollments FOR ALL USING (public.is_admin());

CREATE POLICY "Everyone can view modules" ON modules FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on modules" ON modules FOR ALL USING (public.is_admin());

CREATE POLICY "Everyone can view lessons" ON lessons FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on lessons" ON lessons FOR ALL USING (public.is_admin());

CREATE POLICY "Everyone can view materials" ON course_materials FOR SELECT USING (true);
CREATE POLICY "Admins can do everything on materials" ON course_materials FOR ALL USING (public.is_admin());

CREATE POLICY "Admins can view logs" ON logs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can insert logs" ON logs FOR INSERT WITH CHECK (public.is_admin());


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
