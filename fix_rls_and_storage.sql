-- ============================================
-- REPARACIÓN INTEGRAL DE RLS Y ALMACENAMIENTO
-- ============================================

-- 1. Asegurar que la función is_admin existe y es robusta
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Habilitar RLS en todas las tablas (por si acaso)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;

-- 3. Limpiar políticas existentes para evitar conflictos
DROP POLICY IF EXISTS "Admins can do everything on courses" ON public.courses;
DROP POLICY IF EXISTS "Admins can do everything on modules" ON public.modules;
DROP POLICY IF EXISTS "Admins can do everything on lessons" ON public.lessons;
DROP POLICY IF EXISTS "Admins can do everything on profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can do everything on enrollments" ON public.enrollments;
DROP POLICY IF EXISTS "Admins can view logs" ON public.logs;
DROP POLICY IF EXISTS "Admins can insert logs" ON public.logs;

-- 4. Crear políticas para Administradores
-- Cursos
CREATE POLICY "Admins can do everything on courses" ON public.courses
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Módulos
CREATE POLICY "Admins can do everything on modules" ON public.modules
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Lecciones
CREATE POLICY "Admins can do everything on lessons" ON public.lessons
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Perfiles
CREATE POLICY "Admins can do everything on profiles" ON public.profiles
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Inscripciones
CREATE POLICY "Admins can do everything on enrollments" ON public.enrollments
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Logs
CREATE POLICY "Admins can view logs" ON public.logs
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert logs" ON public.logs
FOR INSERT WITH CHECK (public.is_admin());

-- 5. Crear tabla de Materiales del Curso (PDFs Generales)
CREATE TABLE IF NOT EXISTS public.course_materials (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    course_id BIGINT REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    file_type TEXT DEFAULT 'pdf',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.course_materials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Materials viewable by everyone" ON public.course_materials;
CREATE POLICY "Materials viewable by everyone" ON public.course_materials
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can do everything on materials" ON public.course_materials;
CREATE POLICY "Admins can do everything on materials" ON public.course_materials
FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 6. Políticas de Lectura para Usuarios (Si no existían)
DROP POLICY IF EXISTS "Everyone can view modules" ON public.modules;
CREATE POLICY "Everyone can view modules" ON public.modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Everyone can view lessons" ON public.lessons;
CREATE POLICY "Everyone can view lessons" ON public.lessons FOR SELECT USING (true);
