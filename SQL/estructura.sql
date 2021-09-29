
-- Creando la base de datos

DROP DATABASE IF EXISTS institucion_isabel;
CREATE DATABASE institucion_isabel;
\c institucion_isabel;


-- USUARIOS

-- Crear tabla de usuarios

CREATE TABLE usuarios (
  idUsuario SERIAL PRIMARY KEY, 
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  contraseña TEXT NOT NULL,
  correo_electronico TEXT NULL,
  "role" INTEGER NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

-- Crear tabla de roles

CREATE TABLE roles (
  idRole SERIAL PRIMARY KEY NOT NULL,
  nombre_role	TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

-- Crear datos tabla roles 

INSERT INTO roles( nombre_role) VALUES
('ADMIN'),
('TESORERO'),
('CONTADOR'),
('PRESIDENTE');

-- Crear tabla permisos

CREATE TABLE permisos(
  idPermiso	SERIAL PRIMARY KEY NOT NULL,
  nombre_permiso	TEXT NOT NULL,
  creado	TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

-- Crear datos tabla permisos

INSERT INTO permisos(nombre_permiso) VALUES
('Iniciar sesión'),
('Cerrar sesión')

-- Crear tabla roles_permisos

CREATE TABLE roles_permisos(
  idPermiso	INTEGER NOT NULL,
  idRole	INTEGER NOT NULL,
  PRIMARY KEY(idPermiso, idRole)
); 

-- Crear datos roles_permisos

INSERT INTO roles_permisos(idPermiso, idRole) VALUES
(1,1),
(1,1);

-- Modificar la relacion entre usuarios y roles

ALTER TABLE usuarios
  add constraint FK_role
  foreign key ("role")
  references roles (idRole);

-- Crear datos de la tabla usuarios

INSERT INTO usuarios( nombre, apellido, contraseña, correo_electronico, "role") VALUES
('Laura','Rivero', 'Password','lau@tec.mx', 1),
('Daniel','Cu','Password','daniel@tec.mx', 1);
('Polo','Juarez', 'Password','polo@tec.mx', 1),
('Julio','Hernandez','Password','julio@tec.mx', 1);


-- DONADORES

-- Crear tabla CFDIS
CREATE TABLE cfdis(

);

-- Crear datos de la tabla CFDIS
INSERT INTO cfdis() VALUES
()

-- Crear tabla estados
CREATE TABLE estados(

);

-- Crear datos de la tabla estados
INSERT INTO estados() VALUES
()


-- Crear tabla donadores

CREATE TABLE donadores(

);

-- Crear datos de la tabla donadores

INSERT INTO donadores() VALUES
()



-- DONACIONES

-- Crear tabla de beneficiarios

CREATE TABLE beneficiarios(
  idBeneficiario SERIAL PRIMARY KEY NOT NULL,
  nombre_beneficiario TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

-- Crear datos de la tabla beneficiarios

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

-- Crear tabla métodos de pago

CREATE TABLE metodos_pago(
  idMetodoPago SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);


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
('tarjeta de regalo','numero: 122345');

-- Crear tabla categorias 

CREATE TABLE categorias(
  idCategoria SERIAL PRIMARY KEY NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP(0)
);

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

-- Crear tabla tipo de donación

CREATE TABLE tipo_donacion(

);

-- Crear datos de la tabla tipo_donacion

INSERT INTO tipo_donacion() VALUES
()


-- Crear tabla donaciones

CREATE TABLE donaciones(
  idDonacion	SERIAL PRIMARY KEY,
  idDonador	INTEGER,
  idMetodoPago	INTEGER,
  idTipoDonacion	INTEGER,
  nombre	TEXT NOT NULL,
  monto	NUMERIC(10,2) NOT NULL,
  foto_donacion	TEXT,
  esta_facturado	DATE, 
  creado TIMESTAMP CURRENT_TIMESTAMP(0)
);

INSERT INTO donaciones(idDonador, idMetodoPago, idTipoDonacion, nombre, monto) VALUES
(1,1,1,'10 computadoras', 3000),


-- Crear tabla donaciones_beneficiarios

CREATE TABLE donaciones_beneficiarios(
  idBeneficiario	INTEGER NOT NULL,
  idDonacion	INTEGER NOT NULL,
  destino_donacion	TEXT NOT NULL,
  creado	TIMESTAMP CURRENT_TIMESTAMP(0),
  PRIMARY KEY(idBeneficiario, idDonacion)
);

-- Crear datos de la tabla donaciones_beneficiarios

INSERT INTO donaciones_beneficiarios(idBeneficiario, idDonacion, destino_donacion) VALUES
(1,1, 'Crear un nuevo salon de clases'),
(2,2, 'Para los niños de la casa hogar'),
(2,1, 'Para el evento de diciembre'),
(2,1, 'Para el evento de verano'),
(2,1, 'Configurar el nuevo internet'),
(2,1, 'Para uso del instituto'),
(2,1, 'Para uso del instituto');

-- Crear tabla donaciones_categorias

CREATE TABLE donaciones_categorias(
  idCategoria	INTEGER NOT NULL, 
  idDonacion	INTEGER NOT NULL,
  PRIMARY KEY(idCategoria,idDonacion)
);

-- Crear datos de la tabla donaciones_categorias

INSERT INTO donaciones_categorias(idCategoria, idDonacion) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,1),
(2,2),
(2,3),
(3,1),
(3,2),
(3,3);

-- NOTAS 

-- Crear tabla de notas

CREATE TABLE notas (
  idNota	SERIAL PRIMARY KEY,
  idDonacion INTEGER,
  idUsuario INTEGER,
  titulo	TEXT NOT NULL,
  contenido	TEXT NOT NULL,
  fecha_limite	DATE NOT NULL,
  estado_completado	SMALLINT DEFAULT 0,
  estado_activo	SMALLINT DEFAULT 1,
  creado	TIMESTAMP CURRENT_TIMESTAMP(0)
);

-- Modificar la relacion entre usuarios y roles

ALTER TABLE notas
  add constraint FK_idUsuario
  foreign key ("idUsuario")
  references usuarios (idUsuario);

ALTER TABLE notas
  add constraint FK_idDonacion
  foreign key ("idDonacion")
  references donaciones (idDonacion);

-- Crear datos de la tabla notas

INSERT INTO notas(titulo, contenido, fecha_limite, idUsuario, idDonacion) VALUES
('Modificar nombre de proveedor','Este proveedor cambio de razón social', '20-10-2021',4,1),
('Modificar correo de facturación','Este proveedor marco en la mañana y necesita que le llegue su factura', '20-10-2021',4,2),

