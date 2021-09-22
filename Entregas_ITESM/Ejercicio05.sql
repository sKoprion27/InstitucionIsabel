/*
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección)
*/

-- 1) El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado.
SELECT nombre, SUM(sueldo) as 'ingreso total'
FROM elenco e
GROUP BY nombre
ORDER BY nombre ASC

-- 2) El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's.
-- GROUP BY -> Poner todas las columnas que no usan la función agregada
SELECT nomestudio, SUM(presupuesto) as 'Presupuesto_Decada'
FROM Pelicula
GROUP BY nomestudio
WHERE (año >= 1980) AND (año < 1990) -- año BETWEEN 1980 AND 1990
ORDER BY año ASC

-- 3) Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 
--    5 millones de dolares por película.
SELECT A.nombre, AVG(E.sueldo) as 'Sueldo_Promedio'
FROM Actor A, Elenco E
WHERE A.nombre = E.nombre AND A.sexo = 'Masculino'
GROUP BY A.nombre
HAVING AVG(E.sueldo) > 5000000

-- 4) Título y año de producción de las películas con menor presupuesto. (Por ejemplo, la película de Titanic se ha producido 
--    en varias veces entre la lista de películas estaría la producción de Titanic y el año que fue filmada con menor presupuesto).
SELECT Titulo, año, MIN(presupuesto) as 'MIN_Presupuesto'
FROM Pelicula
GROUP BY Titulo
ORDER BY MIN(presupuesto) ASC

-- 5) Mostrar el sueldo de la actriz mejor pagada.
SELECT A.nombre, MAX(E.sueldo) as 'Sueldo'
FROM Actor A, Elenco E
WHERE A.nombre = E.nombre AND A.sexo = 'Femenino'
GROUP BY A.nombre