-- 1) Consultar Usuarios
SELECT nombre, apellido, correo_electronico, R.nombre_role Rol
FROM usuarios U, roles R
WHERE U.id_role = R.id;

-- 2) Consultar Roles
SELECT nombre_role
FROM roles;

-- 3) Consultar Permisos
SELECT nombre_permiso
FROM permisos;

-- 4) Consultar los permisos de cada rol
SELECT nombre_role AS rol, nombre_permiso AS permiso
FROM roles_permisos RP, roles R, permisos P
WHERE RP.id_permiso = P.id AND RP.id_role = R.id;

-- 5) Consultar CFDIs
SELECT clave, descripcion
FROM cfdis;

-- 6) Consultar Estados
SELECT nombre
FROM estados;

-- 7) Consultar Donadores
SELECT telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal, E.nombre as Estado, C.clave Clave_CFDI, C.descripcion Decripcion_CFDI
FROM donadores D, cfdis C, estados E
WHERE D.id_cfdi = C.id AND D.id_estado = E.id;

-- 8) Consultar Beneficiarios
SELECT nombre_beneficiario, descripcion
FROM beneficiarios;

-- 9) Consultar metodos de pago
SELECT nombre, descripcion
FROM metodos_pago;

-- 10) Consultar categorias
SELECT nombre, descripcion
FROM categorias;

-- 11) Consultar tipos de donacion
SELECT nombre, descripcion
FROM tipo_donaciones;

-- 12) Consultar donaciones
SELECT D.nombre, monto, M.nombre AS Metodo_Pago, T.nombre Tipo_Donacion, N.razon_social, N.rfc
FROM donaciones D, donadores N, metodos_pago M, tipo_donaciones T
WHERE D.id_donador = N.id AND D.id_metodo_pago = M.id AND D.id_tipo_donacion = T.id;

-- 13) Consultar Beneficiarios de las Donaciones
SELECT D.nombre, B.nombre_beneficiario, destino_donacion
FROM donaciones_beneficiarios DB, donaciones D, beneficiarios B
WHERE DB.id_beneficiario = B.id AND DB.id_donacion = D.id;

-- 14) Consultar Categorias de las donaciones
SELECT D.nombre AS nombre_donacion, C.nombre AS categoria
FROM donaciones_categorias DC, donaciones D, categorias C
WHERE DC.id_categoria = C.id AND DC.id_donacion = D.id;

-- 15) Consultar Notas
SELECT titulo, contenido, fecha_limite, D.nombre Donacion, U.nombre Usuario
FROM notas N, Donaciones D, usuarios U
WHERE N.id_donacion = D.id AND N.id_usuario = U.id;


