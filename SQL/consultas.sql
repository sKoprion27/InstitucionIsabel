-- 1) Consultar Usuarios
SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id AND U.existe = true;

-- 1.1) Consultar un usuario
SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id AND U.id = $1 AND U.existe = true;

-- 1.2) Borrar un usuario
UPDATE usuarios
SET existe = false
WHERE id = 6;

-- 2) Consultar Roles
SELECT nombre_role
FROM roles  
WHERE existe = true;

-- 2.1) Consultar un rol
SELECT nombre_role
FROM roles
WHERE id = $1 AND existe = true;

-- 2.2) Borrar un Rol
UPDATE roles
SET existe = false
WHERE id = $1;

-- 3) Consultar Permisos
SELECT nombre_permiso
FROM permisos
WHERE existe = true;

-- 3.1) Consultar un permiso 
SELECT nombre_permiso
FROM permisos
WHERE id = $1 AND existe = true;

-- 3.2) Borrar un permiso
UPDATE permisos
SET existe = false
WHERE id = $1;

-- 4) Consultar los permisos de cada rol
SELECT nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id AND RP.existe = true;

-- 4.1) Consultar los permisos de un solo rol
SELECT nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id AND R.id = $1 AND RP.existe = true;

-- 4.2) Borrar los permisos de un rol
UPDATE roles_permisos
SET existe = false
WHERE id = $1;

-- 5) Consultar CFDIs
SELECT clave, descripcion
FROM cfdis 
WHERE existe = true;

-- 5.1) Consultar un CFDI
SELECT clave, descripcion
FROM cfdis
WHERE id = $1 AND existe = true;

-- 5.2) Borrar un cfdi
UPDATE cfdis
SET existe = false
WHERE id = $1;

-- 6) Consultar Estados
SELECT nombre
FROM estados 
WHERE existe = true;

-- 6.1) Consultar un estado
SELECT nombre
FROM estados
WHERE id = $1 AND existe = true;


-- 6.2) Borrar un estado
UPDATE estados
SET existe = false
WHERE id = $1;

-- 7) Consultar Donadores
SELECT telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id AND D.existe = true;

-- 7.1) Consultar un Donador
SELECT telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id AND D.id = $1 AND D.existe = true;

-- 7.2) Borrar un donador
UPDATE donadores
SET existe = false
WHERE id = $1;

-- 8) Consultar Beneficiarios
SELECT nombre_beneficiario, descripcion
FROM beneficiarios
WHERE existe = true;

-- 8.1) Consultar un beneficiario 
SELECT nombre_beneficiario, descripcion
FROM beneficiarios
WHERE nombre_beneficiario = '$1' AND existe = true;

-- 8.2) Borrar un beneficiario
UPDATE beneficiarios
SET existe = false
WHERE id = $1;

-- 9) Consultar metodos de pago
SELECT nombre, descripcion
FROM metodos_pago
WHERE existe = true;

-- 9.1) Consultar un método de pago
SELECT nombre, descripcion
FROM metodos_pago
WHERE id = $1 AND existe = true;

-- 9.2) Borrar un método de pago
UPDATE metodos_pago
SET existe = false
WHERE id = $1;

-- 10) Consultar categorias
SELECT nombre, descripcion
FROM categorias
WHERE existe = true;

-- 10.1) Consultar una categoría
SELECT nombre, descripcion
FROM categorias
WHERE nombre = '$1' AND existe = true;

-- 10.2) Borrar una categoría
UPDATE categorias
SET existe = false
WHERE id = $1;

-- 11) Consultar tipos de donacion
SELECT nombre, descripcion
FROM tipo_donaciones
WHERE existe = true;

-- 11.1) Consultar un tipo de donación
SELECT nombre, descripcion
FROM tipo_donaciones
WHERE id = $1 and existe = true;

-- 11.2) Borrar un tipo de donación
UPDATE tipo_donaciones
SET existe = false
WHERE id = $1;

-- 12) Consultar donaciones
SELECT D.nombre, monto, M.nombre AS Metodo_Pago, T.nombre Tipo_Donacion, N.razon_social, N.rfc
FROM donaciones D, donadores N, metodos_pago M, tipo_donaciones T
WHERE D.id_donador = N.id AND D.id_metodo_pago = M.id AND D.id_tipo_donacion = T.id AND D.existe = true;

-- 12.1) Consultar una donación
SELECT D.nombre, monto, M.nombre AS Metodo_Pago, T.nombre Tipo_Donacion, N.razon_social, N.rfc
FROM donaciones D, donadores N, metodos_pago M, tipo_donaciones T
WHERE D.id_donador = N.id AND D.id_metodo_pago = M.id AND D.id_tipo_donacion = T.id AND D.id = $1 AND D.existe = true;

-- 12.2) Borrar una donación
UPDATE donaciones
SET existe = false
WHERE id = $1;

-- 13) Consultar Beneficiarios de las Donaciones
SELECT D.nombre, B.nombre_beneficiario, destino_donacion
FROM donaciones_beneficiarios DB, donaciones D, beneficiarios B
WHERE DB.id_beneficiario = B.id AND DB.id_donacion = D.id AND DB.existe = true;

-- 13.1) Consultar donaciones a un beneficiario
SELECT D.nombre, B.nombre_beneficiario, destino_donacion
FROM donaciones_beneficiarios DB, donaciones D, beneficiarios B
WHERE DB.id_beneficiario = B.id AND DB.id_donacion = D.id AND B.id = $1 AND DB.existe = true;

-- 13.2) Borrar una donación a un beneficiario
UPDATE donaciones_beneficiarios
SET existe = false
WHERE id = $1;

-- 14) Consultar Categorias de las donaciones
SELECT D.nombre AS nombre_donacion, C.nombre AS categoria
FROM donaciones_categorias DC, donaciones D, categorias C
WHERE DC.id_categoria = C.id AND DC.id_donacion = D.id AND DC.existe = true;

-- 14.1) Consultaar donaciones de una categoria
SELECT D.nombre AS nombre_donacion, C.nombre AS categoria
FROM donaciones_categorias DC, donaciones D, categorias C
WHERE DC.id_categoria = C.id AND DC.id_donacion = D.id AND C.id = $1 DC.existe = true;

-- 14.2) Borrar una categoría de una donación
UPDATE donaciones_categorias
SET existe = false
WHERE id = $1;

-- 15) Consultar Notas
SELECT titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id and N.existe = true;

-- 15.1) Consultar una nota
SELECT titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id AND N.id = $1 AND N.existe = true;

-- 15.2) Consultar todas las notas asignadas a un usuario
SELECT titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id  AND U.id = $1 AND N.existe = true;

-- 15.3) Borrar una nota
UPDATE notas
SET existe = false
WHERE id = $1;



