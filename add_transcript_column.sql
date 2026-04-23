-- 1. Añadir la columna 'transcript' a la tabla 'lessons' si no existe
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS transcript TEXT;

-- 2. Recargar el esquema en caché de Supabase (muy importante para evitar el error "schema cache")
NOTIFY pgrst, 'reload schema';
