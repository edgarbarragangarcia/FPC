-- ============================================
-- REPARACIÓN DE CLAVES FORÁNEAS (RELACIONES)
-- ============================================
-- Este script actualiza todas las relaciones de tu base de datos para asegurar
-- que los borrados en cascada (ON DELETE CASCADE) funcionen correctamente
-- y evitar que alguien se pueda inscribir dos veces a un mismo curso.

-- 1. Actualizar tabla PROFILES (Si un usuario se elimina en Auth, se borra su perfil)
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_id_fkey,
ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Actualizar tabla MODULES (Si un curso se elimina, sus módulos se borran)
ALTER TABLE public.modules 
DROP CONSTRAINT IF EXISTS modules_course_id_fkey,
ADD CONSTRAINT modules_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 3. Actualizar tabla LESSONS (Si un módulo se elimina, sus lecciones se borran)
ALTER TABLE public.lessons 
DROP CONSTRAINT IF EXISTS lessons_module_id_fkey,
ADD CONSTRAINT lessons_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.modules(id) ON DELETE CASCADE;

-- 4. Actualizar tabla ENROLLMENTS (Si curso/usuario se borran, se cancela inscripción)
ALTER TABLE public.enrollments 
DROP CONSTRAINT IF EXISTS enrollments_profile_id_fkey,
ADD CONSTRAINT enrollments_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.enrollments 
DROP CONSTRAINT IF EXISTS enrollments_course_id_fkey,
ADD CONSTRAINT enrollments_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- 5. Regla única para inscripciones
-- Primero, borramos cualquier inscripción duplicada que haya quedado colgada (solo deja la última por seguridad)
DELETE FROM public.enrollments e1
WHERE EXISTS (
  SELECT 1 FROM public.enrollments e2
  WHERE e1.profile_id = e2.profile_id AND e1.course_id = e2.course_id AND e1.id < e2.id
);

-- Ahora sí añadimos la restricción única: Un mismo usuario NO puede inscribirse 2 veces
ALTER TABLE public.enrollments
DROP CONSTRAINT IF EXISTS enrollments_unique_user_course;

ALTER TABLE public.enrollments
ADD CONSTRAINT enrollments_unique_user_course UNIQUE (profile_id, course_id);
