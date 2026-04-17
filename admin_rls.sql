-- Permite a los Administradores modificar los perfiles de cualquier usuario
CREATE POLICY "Admins can update everything" 
ON public.profiles FOR UPDATE 
USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' );

-- Permite a los Administradores borrar perfiles (opcional)
CREATE POLICY "Admins can delete everything" 
ON public.profiles FOR DELETE 
USING ( (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin' );
