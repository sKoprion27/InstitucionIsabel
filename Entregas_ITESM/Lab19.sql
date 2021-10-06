-- Materiales(Clave, Descripción, Costo, PorcentajeImpuesto)
-- Proveedores(RFC, RazonSocial)
-- Proyectos(Numero, Denominacion)
-- Entregan(Clave, RFC, Numero, Fecha, Cantidad)

-- 1) La suma de las cantidades e importe total de todas las entregas realizadas durante el 97
SELECT SUM(M.cantidad) AS Cantidad_Total, SUM(M.costo * E.cantidad) AS Importe_Total
FROM Materiales M, Entregan E
WHERE (M.clave = E.clave) AND Fecha BETWEEN '1997-01-01' AND '1997-31-12'

-- 2) Para cada proveedor, obtener la razón social del proveedor, número de entregas e importe total de las entregas realizadas
SELECT RazonSocial, SUM(M.clave) AS Numero_Entregas, SUM(M.costo * E.cantidad) AS Importe_Total
FROM Materiales M, Entregan E, Proveedores P 
WHERE M.clave = E.clave AND E.RFC = P.RFC 
GROUP BY RazonSocial

-- 3) Por cada material obtener la clave y descripción del material, la cantidad total entregada, la mínima cantidad entregada, 
-- la máxima cantidad entregada, el importe total de las entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400
SELECT M.clave, M.descripcion, SUM(E.cantidad) AS Cantidad_Total, MIN(E.cantidad) AS Minima_Cantidad, MAX(E.cantidad) AS Maxima_Cantidad, SUM(M.costo * E.cantidad) AS Importe_Total
FROM materiales M, entregan E
WHERE M.clave = E.clave
GROUP BY M.clave, M.descripcion
HAVING AVG(E.cantidad) > 400