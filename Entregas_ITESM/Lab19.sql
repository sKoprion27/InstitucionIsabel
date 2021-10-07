-- Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
-- Proveedores(RFC, RazonSocial)
-- Proyectos(Numero, Denominacion)
-- Entregan(Clave, RFC, Numero, Fecha, Cantidad)

-- 1) La suma de las cantidades e importe total de todas las entregas realizadas durante el 97
SELECT SUM(E.cantidad) AS Cantidad_Total, SUM(Ma.precio * E.cantidad) AS Importe_Total
FROM materiales Ma, entregan E
WHERE (Ma.clave = E.clave) AND Fecha BETWEEN '1997-01-01' AND '1997-12-31';

-- 2) Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas
SELECT razon_social, SUM(M.clave) AS Numero_Entregas, SUM(M.precio * E.cantidad) AS Importe_Total
FROM Materiales M, Entregan E, Proveedores P 
WHERE M.clave = E.clave AND E.RFC = P.RFC 
GROUP BY razon_social;

-- 3) Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, 
-- la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400
SELECT M.clave, M.descripcion, SUM(E.cantidad) AS Cantidad_Total, MIN(E.cantidad) AS Minima_Cantidad, MAX(E.cantidad) AS Maxima_Cantidad, SUM(M.precio * E.cantidad) AS Importe_Total
FROM materiales M, entregan E
WHERE M.clave = E.clave
GROUP BY M.clave, M.descripcion
HAVING AVG(E.cantidad) > 400;

-- 4) Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada material entregado, 
-- detallando la clave y descripción del material, excluyendo aquellos proveedores para los que la cantidad promedio sea menor a 500.

SELECT M.clave, M.descripcion, razon_social, AVG(E.cantidad) AS Cantidad_Promedio
FROM entregan E, materiales M, proveedores P
WHERE E.clave = M.clave AND E.rfc = P.rfc
GROUP BY razon_social
HAVING Cantidad_Promedio > 100;

-- 5) Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para dos grupos de proveedores: aquellos para los que la cantidad 
-- promedio entregada es menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450

SELECT razon_social, AVG(E.cantidad) AS Cantidad_Promedio
FROM entregan E, materiales M, proveedores P
WHERE E.clave = M.clave AND E.rfc = P.rfc
GROUP BY razon_social
HAVING Cantidad_Promedio < 370 OR Cantidad_Promedio > 450;


-- 1) Clave y descripción de los materiales que nunca han sido entregados.

SELECT clave, descripcion
FROM materiales
WHERE clave NOT IN (
	SELECT clave
	FROM entregan
);

-- 2) Razón social de los proveedores que han realizado entregas tanto al proyecto 'Vamos México' como al proyecto 'Querétaro Limpio'.

SELECT razon_social
FROM proveedores
WHERE rfc IN (
	SELECT rfc
	FROM entregan E, proyectos P
	WHERE E.numero = P.numero AND P.denominacion = 'Vamos Mexico' OR P.denominacion = 'Queretaro limpio' 
);
-- 3) Descripción de los materiales que nunca han sido entregados al proyecto 'CIT Yucatán'.

SELECT M.descripcion
FROM materiales M, entregan E
WHERE E.clave = M.clave AND E.clave NOT IN (
	SELECT E.clave
	FROM entregan E, proyectos P
	WHERE E.numero = P.numero AND denominacion = 'CIT Yucatan'
);

-- 4) Razón social y promedio de cantidad entregada de los proveedores cuyo promedio de cantidad entregada es mayor 
-- al promedio de la cantidad entregada por el proveedor con el RFC 'AAAA800101'.
SELECT P.razon_social, AVG(E.cantidad) AS Promedio_Cantidad_Entregada
FROM proveedores P, entregan E
WHERE P.rfc = E.rfc
GROUP BY razon_social
HAVING AVG(cantidad) > (
	SELECT AVG(E.cantidad)
	FROM proveedores P, entregan E
	WHERE P.rfc = E.rfc AND P.rfc = 'AAAA800101'
);

-- 5) RFC, razón social de los proveedores que participaron en el proyecto 'Infonavit Durango' y cuyas 
-- cantidades totales entregadas  en el 2000 fueron mayores a las cantidades totales entregadas en el 2001.
-- Pendiente, preguntar al profe

SELECT rfc, razon_social
FROM entregan E, proveedores P

SELECT SUM(cantidad)
FROM entregan E, proveedores P, proyctos Pr
WHERE P.rfc = E.rfc AND Pr.numero = E.numero AND pr.denominacion = 'Infonavit Durango'

SELECT *
FROM entregan E, proveedores P
WHERE P.rfc = E.rfc AND razon_social = 'La fragua';

SELECT SUM(E.cantidad)
FROM entregan E, proveedores P
WHERE P.rfc = E.rfc AND fecha BETWEEN '2000-01-01' AND '2000-12-31'
GROUP BY P.rfc, razon_social;

SELECT SUM(E.cantidad)
FROM entregan E, proveedores P
WHERE P.rfc = E.rfc AND fecha BETWEEN '2001-01-01' AND '2001-12-31'
GROUP BY P.rfc, razon_social;