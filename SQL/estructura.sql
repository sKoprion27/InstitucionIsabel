-- BASE DE DATOS

DROP DATABASE IF EXISTS institucion_isabel;
CREATE DATABASE institucion_isabel;
\c institucion_isabel;

-- CREAR TABLAS

-- USUARIOS

-- Crear tabla de usuarios

CREATE TABLE usuarios(
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  "password" TEXT NOT NULL,
  correo_electronico TEXT NULL,
  id_role INTEGER NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla de roles
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  nombre_role TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla permisos
CREATE TABLE permisos(
  id SERIAL PRIMARY KEY,
  nombre_permiso TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla roles_permisos
CREATE TABLE roles_permisos(
  id SERIAL PRIMARY KEY,
  id_permiso INTEGER NOT NULL,
  id_role INTEGER NOT NULL,
  existe BOOLEAN DEFAULT TRUE
);
-- DONADORES
-- Crear tabla CFDIS
CREATE TABLE cfdis(
  id SERIAL PRIMARY KEY,
  clave TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla estados
CREATE TABLE estados(
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  existe BOOLEAN DEFAULT TRUE
);
-- Crear tabla donadores
CREATE TABLE donadores(
  id SERIAL PRIMARY KEY,
  id_cfdi INTEGER NOT NULL,
  id_estado INTEGER NOT NULL,
  nombre_contacto TEXT NOT NULL,
  telefono TEXT NOT NULL,
  razon_social TEXT NOT NULL,
  rfc TEXT NOT NULL,
  correo_electronico TEXT NOT NULL,
  codigo_postal INTEGER NOT NULL,
  domicilio_fiscal TEXT NOT NULL,
  regimen_fiscal BOOLEAN NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- DONACIONES

-- Crear tabla de beneficiarios
CREATE TABLE beneficiarios(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre_beneficiario TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla métodos de pago
CREATE TABLE metodos_pago(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla categorias
CREATE TABLE categorias(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla tipo de donación
CREATE TABLE tipo_donaciones(
  id SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla donaciones
CREATE TABLE donaciones(
  id SERIAL PRIMARY KEY,
  id_donador INTEGER NOT NULL,
  id_metodo_pago INTEGER NOT NULL,
  id_tipo_donacion INTEGER NOT NULL,
  nombre TEXT NOT NULL,
  monto NUMERIC(10,2) NOT NULL,
  foto_donacion TEXT,
  esta_facturado DATE,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla donaciones_beneficiarios
CREATE TABLE donaciones_beneficiarios(
  id SERIAL PRIMARY KEY,
  id_beneficiario INTEGER NOT NULL,
  id_donacion INTEGER NOT NULL,
  destino_donacion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- Crear tabla donaciones_categorias

CREATE TABLE donaciones_categorias(
  id SERIAL PRIMARY KEY,
  id_categoria INTEGER NOT NULL,
  id_donacion INTEGER NOT NULL,
  existe BOOLEAN DEFAULT TRUE
);

-- NOTAS

-- Crear tabla de notas
CREATE TABLE notas (
  id SERIAL PRIMARY KEY,
  id_donacion INTEGER,
  id_usuario INTEGER,
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_limite DATE NOT NULL,
  estado_completado SMALLINT DEFAULT 0,
  estado_activo SMALLINT DEFAULT 1,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0),
  existe BOOLEAN DEFAULT TRUE
);

-- CONSTRAINTS EN TABLAS

-- constraint tabla usuarios
ALTER TABLE usuarios
ADD CONSTRAINT FK_id_role
FOREIGN KEY(id_role)
REFERENCES roles (id);

-- constraint tabla roles_permisos
ALTER TABLE roles_permisos
ADD CONSTRAINT FK_id_permiso
FOREIGN KEY(id_permiso)
REFERENCES permisos(id);

ALTER TABLE roles_permisos
ADD CONSTRAINT FK_id_role
FOREIGN KEY(id_role)
REFERENCES roles(id);

-- constraint tabla notas
ALTER TABLE notas
ADD CONSTRAINT FK_id_usuario
FOREIGN KEY(id_usuario)
REFERENCES usuarios(id);

ALTER TABLE notas
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

-- constraint tabla donadores
ALTER TABLE donadores
ADD CONSTRAINT FK_id_cfdi
FOREIGN KEY(id_cfdi)
REFERENCES cfdis(id);

ALTER TABLE donadores
ADD CONSTRAINT FK_id_estado
FOREIGN KEY(id_estado)
REFERENCES estados(id);

-- constraint tabla donaciones
ALTER TABLE donaciones
ADD CONSTRAINT FK_id_donador
FOREIGN KEY(id_donador)
REFERENCES donadores(id);

ALTER TABLE donaciones
ADD CONSTRAINT FK_id_metodo_pago
FOREIGN KEY(id_metodo_pago)
REFERENCES metodos_pago(id);

ALTER TABLE donaciones
ADD CONSTRAINT FK_id_tipo_donacion
FOREIGN KEY(id_tipo_donacion)
REFERENCES tipo_donaciones(id);

-- Constraint donaciones_beneficiarios
ALTER TABLE donaciones_beneficiarios
ADD CONSTRAINT FK_id_beneficiario
FOREIGN KEY(id_beneficiario)
REFERENCES beneficiarios(id);

ALTER TABLE donaciones_beneficiarios
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

-- Constraint donaciones_categorias
ALTER TABLE donaciones_categorias
ADD CONSTRAINT FK_id_donacion
FOREIGN KEY(id_donacion)
REFERENCES donaciones(id);

ALTER TABLE donaciones_categorias
ADD CONSTRAINT FK_id_categoria
FOREIGN KEY(id_categoria)
REFERENCES categorias(id);


-- INSERCIONES EN TABLAS

-- USUARIOS

-- Insertar datos tabla permisos - 10

INSERT INTO permisos(nombre_permiso) VALUES
('Iniciar sesión'),
('Cerrar sesión'),
('Registrar donaciones'),
('Modificar donaciones'),
('Eliminar donaciones'),
('Consultar donaciones'),
('Marcar donación facturada'),
('Descargar excel de consultas donaciones'),
('Registrar método de pago'),
('Modificar método de pago'),
('Consultar métodos de pago'),
('Eliminar método de pago'),
('Registrar beneficiario donación'),
('Modificar beneficiario donación'),
('Consultar beneficiario donación'),
('Eliminar beneficiario donación'),
('Registrar categoria donativo'),
('Modificar categoria donativo'),
('Consultar categoria donativo'),
('Eliminar categoria donativo'),
('Registrar tipo de donativo'),
('Modificar tipo de donativo'),
('Consultar tipo de donativo'),
('Eliminar tipo de donativo'),
('Modificar notas'),
('Eliminar notas'),
('Consultar listado completo de notas'),
('Consultar notas asignadas'),
('Marcar una nota asignada como completada'),
('Registrar donadores'),
('Modificar donadores'),
('Eliminar donadores'),
('Consultar donadores'),
('Registrar usuarios'),
('Modificar usuarios'),
('Eliminar usuarios'),
('Consultar usuarios');


-- Insertar datos tabla roles - 10

INSERT INTO roles( nombre_role) VALUES
('ADMIN'),
('TESORERO'),
('CONTADOR'),
('PRESIDENTE'),
('INVITADO'),
('SUPERVISOR'),
('GERENTE'),
('TRABAJADOR'),
('BECARIO'),
('EXTERNO');

-- Insertar datos tabla roles_permisos - 50

INSERT INTO roles_permisos(id_role , id_permiso) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,25),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(3,1),
(3,2),
(3,3),
(3,4),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(3,10),
(4,7),
(4,8),
(4,9),
(4,5),
(4,2);

-- Insertar datos tabla usuarios - 20

INSERT INTO usuarios( nombre, apellido, "password", correo_electronico, id_role) VALUES
('Laura','Rivero', 'Password','lau@tec.mx', 1),
('Daniel','Cu','Password','daniel@tec.mx', 1),
('Polo','Juarez', 'Password','polo@tec.mx', 1),
('Julio','Hernandez','Password','julio@tec.mx', 1),
('Alberto','Rivero', 'Password','beto@isabel.mx', 2),
('Hugo','Chavez','Password','daniel@isabel.mx', 2),
('Maria','Perez', 'Password','polo@isabel.mx', 6),
('Fernanda','Hernandez','Password','julio@isabel.mx', 7),
('Karla','Rivero', 'Password','lau@isabel.mx', 8),
('Sofia','Cu','Password','daniel@isabel.mx', 4),
('Luis','Juarez', 'Password','polo@isabel.mx', 4),
('Ciro','Polo','Password','julio@isabel.mx', 3),
('Gabriela','Rivero', 'Password','lau@isabel.mx', 2),
('Ernesto','Perez','Password','daniel@alternet.mx', 10),
('Florencio','Olvera', 'Password','polo@alternet.mx', 10),
('Ana','Hernandez','Password','julio@isabel.mx', 5),
('Jose','Rivero', 'Password','lau@isabel.mx', 9),
('Salvador','Cu','Password','daniel@isabel.mx', 8),
('Alexia','Mendez', 'Password','polo@isabel.mx', 2),
('Oswaldo','Sanchez','Password','julio@isabel.mx', 6);

-- DONACIONES

-- Crear datos de la tabla metodos_pago

INSERT INTO metodos_pago(nombre, descripcion) VALUES
('tarjeta visa','numero: 1234 1234 1234 1234'),
('tarjeta mastercard','numero: 3456 3456 3456 3456'),
('tarjeta american express','numero: 7890 7890 7890 7890'),
('cheque','folio: 12345678'),
('paypal','correo: lau@gmail.com'),
('efectivo','monto: $500'),
('3 meses sin intereses','monto: $500'),
('6 meses sin intereses','monto: $500'),
('12 meses sin intereses','monto: $500'),
('Especie','cantidad: 10');

-- Crear datos de la tabla categorias

INSERT INTO categorias(nombre, descripcion) VALUES
('Tecnología','Computadoras para los niños de la institución'),
('Inmobiliario','Sillas para los niños de la institución'),
('Materiales','Materiales de arte para los niños de la institución'),
('Inmobiliario','Sillones para los niños de la institución'),
('Tecnología','Ipads para los niños de la institución'),
('Materiales','Materiales de escritura para los niños de la institución'),
('Tecnología','Pantallas para dar clases a los niños de la institución'),
('Inmobiliario','Mesas para los niños de la institución'),
('Tecnología','Teclados extra para los niños de la institución'),
('Materiales','Materiales de construcción para los niños de la institución');


-- Insertar datos de la tabla CFDIS
INSERT INTO cfdis(clave, descripcion) VALUES
('G01',	'Adquisición de mercancías'),
('G02',	'Devoluciones, descuentos o bonificaciones'),
('G03',	'Gastos en general'),
('I01',	'Construcciones'),
('I02',	'Mobilario y equipo de oficina por inversiones'),
('I03',	'Equipo de transporte'),
('I04',	'Equipo de computo y accesorios'),
('I05',	'Dados, troqueles, moldes, matrices y herramental'),
('I06',	'Comunicaciones telefónicas'),
('I07',	'Comunicaciones satelitales'),
('I08',	'Otra maquinaria y equipo'),
('D01',	'Honorarios médicos, dentales y gastos hospitalarios.'),
('D02',	'Gastos médicos por incapacidad o discapacidad'),
('D03',	'Gastos funerales.'),
('D04',	'Donativos.'),
('D05',	'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación).'),
('D06', 'Aportaciones voluntarias al SAR.'),
('D07', 'Primas por seguros de gastos médicos.'),
('D08',	'Gastos de transportación escolar obligatoria.'),
('D09',	'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones.'),
('D10',	'Pagos por servicios educativos (colegiaturas)'),
('P01',	'Por definir');


-- Insertar datos de la tabla estados - 20
INSERT INTO estados(nombre) VALUES
('Aguascalientes'),
('Baja California'),
('Baja California Sur'),
('Campeche'),
('Chiapas'),
('Chihuahua'),
('Ciudad de México'),
('Coahuila'),
('Colima'),
('Durango'),
('Guanajuato'),
('Guerrero'),
('Hidalgo'),
('Jalisco'),
('México'),
('Michoacán'),
('Morelos'),
('Nayarit'),
('Nuevo León'),
('Oaxaca'),
('Puebla'),
('Querétaro'),
('Quintana'),
('San Luis Potosi'),
('Sinaloa'),
('Sonora'),
('Tabasco'),
('Tamaulipas'),
('Tlaxcala'),
('Veracruz'),
('Yucatán'),
('Zacatecas');

-- Insertar datos de la tabla donadores - 20
INSERT INTO donadores(id_cfdi, id_estado, nombre_contacto, telefono, razon_social, rfc, correo_electronico, codigo_postal, domicilio_fiscal, regimen_fiscal) VALUES
(1,1,'Manuel Andrade', '4424747494', 'Elctriquesos SA', 'ELECT1020ORE', 'manuel@random.com', 76770, 'Cuautemoc 87', true),
(2,2,'Andrea Peralta', '5540804030', 'Salmon SA', 'SADM102050', 'andrea@random.com', 85000, 'Cedro 7', true),
(3,3,'Jesus Perez', '5540802330', 'Tecmis SA', 'ELECT1020ORE', 'jesus@random.com', 45006, 'Colores 57', true),
(4,4,'Juan Sanchez', '8145608574', 'Computadoras SA', 'ELECT1020ORE', 'juan@random.com', 70450, 'San Pedro 66', true),
(5,5,'Eric Ramirez', '7896121416', 'Eric Ramirez Perez', 'ERIC560200', 'eric@random.com', 65040, 'Juarez 68', false),
(1,5,'Erika Hernandez', '7896121416', 'Elctriquesos SA', 'ELECT1020ORE', 'erika@random.com', 89040, 'Heroes 97', true);

-- Insertar datos de la tabla beneficiarios

INSERT INTO beneficiarios(nombre_beneficiario, descripcion) VALUES
('niños de la institución','Esta donación es material didactico para los niños de la institución'),
('colaboradores','Esta donación se utilizará para la compensación de los colaboradores'),
('niños de la institución','Esta donación es para comprar materiales de arte para los niños'),
('niños de la institución','Esta donación es para introducir nuevos cursos para los niños'),
('Personal de la institución','Esta donación es para comprar juguetes para los niños'),
('niños de la institución','Esta donación es para introducir nuevos cursos para los niños'),
('colaboradores','Esta donación se utilizará para la compensación de los colaboradores'),
('Personal de la institución','Esta donación es para pagar los salarios del personal'),
('niños de la institución','Esta donación es para introducir nuevos cursos para los niños'),
('niños de la institución','Esta donación es para la compra de productos de higiene (papel de baño, jabón, etc) para la utilización de los niños'),
('Personal de la institución','Esta donación es para pagar los salarios del personal'),
('niños de la institución','Esta donación es para comprar materiales de arte para los niños'),
('niños de la institución','Esta donación es para la compra de productos de higiene (papel de baño, jabón, etc) para la utilización de los niños'),
('niños de la institución','Esta donación es para comprar juguetes para los niños'),
('niños de la institución','Esta donación es para introducir nuevos cursos para los niños'),
('colaboradores','Esta donación se utilizará para la compensación de los colaboradores'),
('Personal de la institución','Esta donación es para pagar los salarios del personal'),
('Personal de la institución','Esta donación es para comprar juguetes para los niños'),
('niños de la institución','Esta donación es para la compra de productos de higiene (papel de baño, jabón, etc) para la utilización de los niños'),
('niños de la institución','Esta donación es para comprar materiales de arte para los niños'),
('niños de la institución','Esta donación es para la compra de productos de higiene (papel de baño, jabón, etc) para la utilización de los niños');

-- Insertar datos de la tabla tipo_donacion

INSERT INTO tipo_donaciones(nombre, descripcion) VALUES
('efectivo','Donación de dinero (ya sea en efectivo o en tarjeta)'),
('especie','Cubre materia prima, materiales fisicos y apoyo tangible'),
('inmuebles','Donación de una propiedad'),
('puntual','Donación de una cantidad una sola vez'),
('recurrente','Donación realizada cada mes'),
('microdonacion','Donación masiva de pequeñas cantidades');

-- Insertar datos donaciones
INSERT INTO donaciones(id_donador, id_metodo_pago, id_tipo_donacion, nombre, monto) VALUES
(1,1,1,'10 computadoras donador 1', 3001),
(1,2,2,'10 computadoras donador 1', 3002),
(1,2,2,'10 computadoras donador 1', 3003),
(1,1,1,'10 computadoras donador 1', 3004),
(1,2,2,'10 computadoras donador 1', 3005),
(2,1,1,'10 monitores donador 2', 4001),
(2,2,2,'10 monitores donador 2', 4002),
(2,2,2,'10 monitores donador 2', 4003),
(2,1,1,'10 monitores donador 2', 4004),
(2,2,2,'10 monitores donador 2', 4005),
(3,1,1,'10 teclados donador 3', 5001),
(3,2,2,'10 teclados donador 3', 5002),
(3,2,2,'10 teclados donador 3', 5003),
(3,1,1,'10 teclados donador 3', 5004),
(3,2,2,'10 teclados donador 3', 5005),
(4,1,1,'10 teclados donador 4', 6001),
(4,2,2,'10 teclados donador 4', 6002),
(4,2,2,'10 teclados donador 4', 6003),
(4,1,1,'10 teclados donador 4', 6004),
(4,2,2,'10 teclados donador 4', 6005);

-- Insertar datos de la tabla donaciones_beneficiarios - 50

INSERT INTO donaciones_beneficiarios(id_beneficiario, id_donacion, destino_donacion) VALUES
(1,1, 'Crear un nuevo salon de clases'),
(1,2, 'Para los niños de la casa hogar'),
(1,3, 'Para el evento de diciembre'),
(1,4, 'Para el evento de verano'),
(1,5, 'Configurar el nuevo internet'),
(2,1, 'Para uso del 2instituto1'),
(2,2, 'Para uso del 2instituto2'),
(2,3, 'Para uso del 2institut3'),
(2,4, 'Para uso del 2instituto4'),
(2,5, 'Para uso del 2instituto5'),
(3,1, 'Para uso del 3instituto1'),
(3,2, 'Para uso del 3instituto2'),
(3,3, 'Para uso del 3institut3'),
(3,4, 'Para uso del 3instituto4'),
(3,5, 'Para uso del 3instituto5'),
(4,1, 'Para uso del 4instituto1'),
(4,2, 'Para uso del 4instituto2'),
(4,3, 'Para uso del 4institut3'),
(4,4, 'Para uso del 4instituto4'),
(4,5, 'Para uso del 4instituto5');

-- Insertar datos de la tabla donaciones_categorias - 50
INSERT INTO donaciones_categorias(id_categoria, id_donacion) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),
(1,21),
(1,22),
(1,23),
(1,24),
(1,25),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(3,1),
(3,2),
(3,3),
(3,4),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(3,10);

-- NOTAS

-- Insertar datos de la tabla notas - 20

INSERT INTO notas(titulo, contenido, fecha_limite, id_usuario, id_donacion) VALUES
('Modificar nombre de proveedor','Este proveedor cambio de razón social', '20-10-2021',10,1),
('Modificar correo de facturación','Este proveedor marco en la mañana y necesita que le llegue su factura', '1-10-2021',10,2),
('Agregar proveedor','Este proveedor no existe', '2-10-2021',10,3),
('Agregar donacion','No esta donacion de cemex', '3-10-2021',10,4),
('Eliminar donador','Este donador se cambio de pais ', '4-10-2021',10,5),
('Eliminar donacion','La donacion se cancelo', '5-10-2021',10,6),
('Modificar pago','No esta bien el monto', '6-10-2021',10,7),
('Modificar nombre de proveedor','Tiene una letra de más','7-10-2021',10,8),
('Modificar RFC del proovedor','Tiene mal su RFC', '8-10-2021',10,8),
('Modificar Apellido Contador','Poner los dos apellidos', '9-10-2021',10,9),
('Agrega donacion de unicef ','No esta en el sistema esta donacion','10-10-2021',10,10),
('Modificar rfc unicef','Está mal su RFC', '11-10-2021',11,1),
('Modificar domicilio a donador ','Se cambio de domicilio fiscal', '12-10-2021',11,2),
('Modificar monto de donacion','Se omitio un cero en la donacion ', '13-10-2021',11,3),
('Modificar usuario','Tiene mal su nombre', '14-10-2021',11,4),
('Modificar proovedor','Tiene mal su direccion', '15-10-2021',11,5),
('Modificar nombre','Esta mal escrito el nombre', '16-10-2021',11,6),
('Modificar direccion','Se cambio de estado', '17-10-2021',11,7),
('Modificar contraseña','Se le olvido la contraseña', '18-10-2021',11,8),
('Modificar correo','Tiene mal el dominio', '19-10-2021',11,9),
('Agregar usuario','No esta dado de alta TELEVISA en proveedores','20-10-2021',11,10);




