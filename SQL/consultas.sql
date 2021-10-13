-- Consulta Notas
-- Despliega el titulo, contenido fecha limite, usuario y donación de la nota
SELECT titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id;

-- Consulta Donadores
-- Despliega telefono, razon_social, rfc, correo electronico, codigo postal, domicilio fiscal, regimen fiscal (True o false), Estado, Clave del CFDI, Descripcion del CFDI
SELECT telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id

-- Consultar Usuarios
-- Despliega nombre, apellido, correo, rol
SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id
