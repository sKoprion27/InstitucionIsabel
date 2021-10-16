-- 1) Consultar Usuarios
SELECT U.id, nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id AND U.existe = true;

-- 1.1) Consultar un usuario
SELECT U.id, nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id AND U.id = $1 AND U.existe = true;

-- 1.2) Borrar un usuario
UPDATE usuarios
SET existe = false
WHERE id = 6;

-- 1.3) Insertar un usuario
INSERT INTO usuarios(nombre, apellido, password, correo_electronico, id_role)
VALUES ('', '', '', '', $1);

-- 1.4) Actualizar un usuario
UPDATE usuarios
SET nombre = '', apellido= '', password='', correo_electronico='', id_role=$1
WHERE id = $2;

-- 2) Consultar Roles
SELECT id, nombre_role
FROM roles
WHERE existe = true;

-- 2.1) Consultar un rol
SELECT id, nombre_role
FROM roles
WHERE id = $1 AND existe = true;

-- 2.2) Borrar un Rol
UPDATE roles
SET existe = false
WHERE id = $1;

-- 2.3) Insertar un Rol
INSERT INTO roles(nombre_role)
VALUES ('');

-- 2.4) Actualiazar un rol
UPDATE roles
SET nombre_role = ''
WHERE id = $1;

-- 3) Consultar Permisos
SELECT id, nombre_permiso
FROM permisos
WHERE existe = true;

-- 3.1) Consultar un permiso
SELECT id, nombre_permiso
FROM permisos
WHERE id = $1 AND existe = true;

-- 3.2) Borrar un permiso
UPDATE permisos
SET existe = false
WHERE id = $1;

-- 3.3) Insertar un permiso 
INSERT INTO permisos(nombre_permiso)
VALUES ('');

-- 3.4) Actualizar un permiso
UPDATE permisos
SET nombre_permiso = ''
WHERE id = $1; 

-- 4) Consultar los permisos de cada rol
SELECT RP.id, nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id AND RP.existe = true;

-- 4.1) Consultar los permisos de un solo rol
SELECT Rp.id, nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id AND R.id = $1 AND RP.existe = true AND R.existe = true;

-- 4.2) Consultar un solo permiso de un rol
SELECT Rp.id, nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id AND RP.id = $1 AND RP.existe = true;

-- 4.3) Borrar los permisos de un rol
UPDATE roles_permisos
SET existe = false
WHERE id = $1;

-- 4.4) Insertar un permiso a un rol
INSERT INTO roles_permisos(id_permiso, id_role)
VALUES ($1, $2);

-- 4.5) Actualizar un permiso a un rol
UPDATE roles_permisos
SET id_permiso = $1, id_role = $2
WHERE id = $3;

-- 5) Consultar CFDIs
SELECT id, clave, descripcion
FROM cfdis
WHERE existe = true;

-- 5.1) Consultar un CFDI
SELECT id, clave, descripcion
FROM cfdis
WHERE id = $1 AND existe = true;

-- 5.2) Borrar un cfdi
UPDATE cfdis
SET existe = false
WHERE id = $1;

-- 5.3) Insertar un cfdi
INSERT INTO cfdis(clave, descripcion)
VALUES ('', '');

-- 5.4) Actualizar un cfdi
UPDATE cfdis
SET clave = '', descripcion = ''
WHERE id = $1;

-- 6) Consultar Estados
SELECT id, nombre
FROM estados
WHERE existe = true;

-- 6.1) Consultar un estado
SELECT id, nombre
FROM estados
WHERE id = $1 AND existe = true
ORDER BY nombre ASC;

-- 6.2) Borrar un estado
UPDATE estados
SET existe = false
WHERE id = $1;

-- 6.3) Insertar estado
INSERT INTO estados(nombre)
VALUES ('');

-- 6.4) Actualizar un estado
UPDATE estados
SET nombre = ''
WHERE id = $1;

-- 7) Consultar Donadores
SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id AND D.existe = true;

-- 7.1) Consultar un Donador
SELECT D.id, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id AND D.id = $1 AND D.existe = true;

-- 7.2) Borrar un donador
UPDATE donadores
SET existe = false
WHERE id = $1;

-- 7.3) Insertar un donador
INSERT INTO donadores(
	id_cfdi, id_estado, nombre_contacto, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal)
VALUES ($1, $2, '', '', '', '', '', $3, '', true);

-- 7.4) Actualizar un donador
UPDATE donadores
SET id_cfdi = $1, id_estado = $2, nombre_contacto = '', telefono = '', razon_social = '', rfc = '', 
	correo_electronico = '', codigo_postal = $3, domicilio_fiscal = '', regimen_fiscal = 
WHERE id = $4;

-- 8) Consultar Beneficiarios
SELECT id, nombre_beneficiario, descripcion
FROM beneficiarios
WHERE existe = true;

-- 8.1) Consultar un beneficiario
SELECT id, nombre_beneficiario, descripcion
FROM beneficiarios
WHERE nombre_beneficiario = '$1' AND existe = true;

-- 8.2) Borrar un beneficiario
UPDATE beneficiarios
SET existe = false
WHERE id = $1;

-- 8.3) Insertar un beneficiario
INSERT INTO beneficiarios(nombre_beneficiario, descripcion)
VALUES ('', '');

-- 8.4) Actualizar un beneficiario
UPDATE beneficiarios
SET nombre_beneficiario = '', descripcion = ''
WHERE id = $1;

-- 9) Consultar metodos de pago
SELECT id, nombre, descripcion
FROM metodos_pago
WHERE existe = true;

-- 9.1) Consultar un método de pago
SELECT id, nombre, descripcion
FROM metodos_pago
WHERE id = $1 AND existe = true;

-- 9.2) Borrar un método de pago
UPDATE metodos_pago
SET existe = false
WHERE id = $1;

-- 9.3) Insertar método de pago
INSERT INTO metodos_pago(nombre, descripcion)
VALUES ('', '');

-- 9.4) Actualizar un método de pago
UPDATE metodos_pago
SET nombre = '', descripcion = ''
WHERE id = $1;

-- 10) Consultar categorias
SELECT id, nombre, descripcion
FROM categorias
WHERE existe = true;

-- 10.1) Consultar una categoría
SELECT id, nombre, descripcion
FROM categorias
WHERE nombre = '$1' AND existe = true;

-- 10.2) Borrar una categoría
UPDATE categorias
SET existe = false
WHERE id = $1;

-- 10.3) Insertar una categoría
INSERT INTO categorias(nombre, descripcion)
VALUES ('', '');

-- 10.4) Actualizar una categoría
UPDATE categorias
SET nombre = '', descripcion = ''
WHERE id = $1;

-- 11) Consultar tipos de donacion
SELECT id, nombre, descripcion
FROM tipo_donaciones
WHERE existe = true;

-- 11.1) Consultar un tipo de donación
SELECT id, nombre, descripcion
FROM tipo_donaciones
WHERE id = $1 and existe = true;

-- 11.2) Borrar un tipo de donación
UPDATE tipo_donaciones
SET existe = false
WHERE id = $1;

-- 11.3) insertar un tipo de donación
INSERT INTO tipo_donaciones(nombre, descripcion)
VALUES ('', '');

-- 11.4) Actualizar un tipo de donación
UPDATE tipo_donaciones
SET nombre = '', descripcion = ''
WHERE id = $1;

-- 12) Consultar donaciones
SELECT D.id, D.nombre, monto, M.nombre AS Metodo_Pago, T.nombre Tipo_Donacion, N.razon_social, N.rfc
FROM donaciones D, donadores N, metodos_pago M, tipo_donaciones T
WHERE D.id_donador = N.id AND D.id_metodo_pago = M.id AND D.id_tipo_donacion = T.id AND D.existe = true;

-- 12.1) Consultar una donación
SELECT D.id, D.nombre, monto, M.nombre AS Metodo_Pago, T.nombre Tipo_Donacion, N.razon_social, N.rfc
FROM donaciones D, donadores N, metodos_pago M, tipo_donaciones T
WHERE D.id_donador = N.id AND D.id_metodo_pago = M.id AND D.id_tipo_donacion = T.id AND D.id = $1 AND D.existe = true;

-- 12.2) Borrar una donación
UPDATE donaciones
SET existe = false
WHERE id = $1;

-- 12.3) Insertar una donación
INSERT INTO donaciones(id_donador, id_metodo_pago, id_tipo_donacion, nombre, monto, foto_donacion, esta_facturado)
VALUES ($1, $2, $3, '', $4, '', '');

-- 12.4) Actualizar una donación
UPDATE donaciones
SET id_donador = $1, id_metodo_pago = $2, id_tipo_donacion = $3, nombre = '', monto = $4, foto_donacion = '', esta_facturado = ''
WHERE id = $5;

-- 13) Consultar Beneficiarios de las Donaciones
SELECT DB.id, D.nombre, B.nombre_beneficiario, destino_donacion
FROM donaciones_beneficiarios DB, donaciones D, beneficiarios B
WHERE DB.id_beneficiario = B.id AND DB.id_donacion = D.id AND DB.existe = true;

-- 13.1) Consultar donaciones a un beneficiario
SELECT DB.id, D.nombre, B.nombre_beneficiario, destino_donacion
FROM donaciones_beneficiarios DB, donaciones D, beneficiarios B
WHERE DB.id_beneficiario = B.id AND DB.id_donacion = D.id AND B.id = $1 AND DB.existe = true;

-- 13.2) Borrar una donación a un beneficiario
UPDATE donaciones_beneficiarios
SET existe = false
WHERE id = $1;

-- 13.3) Insertar una donación a un beneficiario
INSERT INTO donaciones_beneficiarios(id_beneficiario, id_donacion, destino_donacion)
VALUES ($1, $2, '');

-- 13.4) Actualizar una donación a un beneficiario
UPDATE donaciones_beneficiarios
SET id_beneficiario = $1, id_donacion = $2, destino_donacion = ''
WHERE id = $3;

-- 14) Consultar Categorias de las donaciones
SELECT DC.id, D.nombre AS nombre_donacion, C.nombre AS categoria
FROM donaciones_categorias DC, donaciones D, categorias C
WHERE DC.id_categoria = C.id AND DC.id_donacion = D.id AND DC.existe = true;

-- 14.1) Consultaar donaciones de una categoria
SELECT DC.id, D.nombre AS nombre_donacion, C.nombre AS categoria
FROM donaciones_categorias DC, donaciones D, categorias C
WHERE DC.id_categoria = C.id AND DC.id_donacion = D.id AND C.id = $1 DC.existe = true;

-- 14.2) Borrar una categoría de una donación
UPDATE donaciones_categorias
SET existe = false
WHERE id = $1;

-- 14.3) Insertar una categoría de una donación
INSERT INTO donaciones_categorias(id_categoria, id_donacion)
VALUES ($1, $2);

-- 14.4) Actualizar una categoría de una donación
UPDATE donaciones_categorias
SET id_categoria = $1, id_donacion = $2
WHERE id = $3;

-- 15) Consultar Notas
SELECT N.id, titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id and N.existe = true;

-- 15.1) Consultar una nota
SELECT N.id, titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id AND N.id = $1 AND N.existe = true;

-- 15.2) Consultar todas las notas asignadas a un usuario
SELECT N.id, titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id  AND U.id = $1 AND N.existe = true;

-- 15.3) Borrar una nota
UPDATE notas
SET existe = false
WHERE id = $1;

-- 15.4) Insertar una nota
INSERT INTO notas(id_donacion, id_usuario, titulo, contenido, fecha_limite, estado_completado, estado_activo)
VALUES ($1, $2, '', '', '', $3, $4);

-- 15.5) Actualizar una nota
UPDATE notas
SET id_donacion = $1, id_usuario = $2, titulo = '', contenido = '', fecha_limite = '', estado_completado = $3, estado_activo = $4 
WHERE id = $5;