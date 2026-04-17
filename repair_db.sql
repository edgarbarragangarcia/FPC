-- ============================================
-- FPC LMS - RESET TOTAL DE BASE DE DATOS Y PERFILES
-- ============================================

-- 1. Borrar dependencias que causan problemas (limpieza total)
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 2. Crear tabla de perfiles estructurada desde cero
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE,
    role TEXT DEFAULT 'student',
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Configurar Permisos RLS (Para que la app funcione sin colgarse en el login)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 4. Reemplazar la función de auto-creación del perfil (Trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Nuevo Usuario'), 
    new.email, 
    'student'
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Asegurar que el Trigger existe y está activado
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Opcional: Re-crear tabla Enrollments (Ya que la borramos en el paso 1 si estaba corrupta)
CREATE TABLE IF NOT EXISTS public.enrollments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    status TEXT DEFAULT 'active',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (auth.uid() = profile_id);
CREATE POLICY "Users can enroll themselves" ON enrollments FOR INSERT WITH CHECK (auth.uid() = profile_id);
CREATE POLICY "Users can unenroll themselves" ON enrollments FOR DELETE USING (auth.uid() = profile_id);
