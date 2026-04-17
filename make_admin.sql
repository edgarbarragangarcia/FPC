-- ============================================
-- FPC LMS - Convertir a Administrador
-- Ejecuta este script DESPUÉS de haber creado tu cuenta en la App
-- ============================================

-- Actualizamos el rol de 'student' a 'admin' para el correo específico
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@fpc.org';

-- Consultar para verificar que funcionó
SELECT id, name, email, role FROM public.profiles WHERE email = 'admin@fpc.org';
