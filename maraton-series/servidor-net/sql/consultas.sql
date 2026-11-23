-- sql/consultas.sql
-- Consultas de comprobación del laboratorio. Seleccione UNA consulta y
-- ejecútela con Ctrl + Shift + E (Cmd + Shift + E en Mac).
 
USE Maraton;
 
-- 1. Las tablas que creó la migración
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_NAME;
 
-- 2. El historial de migraciones aplicadas
SELECT * FROM __EFMigrationsHistory;
 
-- 3. Series con su género y su miembro (JOIN: lo que en MongoDB era $lookup)
SELECT s.Id, s.Titulo, g.Nombre AS Genero, s.Estado, m.Nombre AS Miembro
FROM Series AS s
JOIN Miembros AS m ON m.Id = s.MiembroId
JOIN Generos  AS g ON g.Id = s.GeneroId
ORDER BY s.Id;
 
-- 4. Las series que propuso Ana
SELECT s.Titulo
FROM Series AS s
JOIN Miembros AS m ON m.Id = s.MiembroId
WHERE m.Correo = N'ana@club.com';
 
-- 5. El resumen: cuántas series hay en cada estado
SELECT Estado, COUNT(*) AS Cantidad
FROM Series
GROUP BY Estado
ORDER BY Estado;

-- 6. Géneros favoritos de cada miembro (después de la segunda migración)
SELECT m.Nombre AS Miembro, g.Nombre AS Genero
FROM MiembroGeneros AS mg
JOIN Miembros AS m ON m.Id = mg.MiembroId
JOIN Generos  AS g ON g.Id = mg.GeneroId
ORDER BY m.Nombre, g.Nombre;

-- ── Experimentos: cada uno DEBE fallar ──
 
-- E1. Clave foránea: el miembro 99 no existe
INSERT INTO Series (Titulo, Temporadas, Estado, GeneroId, MiembroId)
VALUES (N'Fantasma', 1, N'Por ver', 1, 99);
 
-- E2. Índice único: el correo ya existe
INSERT INTO Miembros (Nombre, Correo, Registro)
VALUES (N'Otra Ana', N'ana@club.com', '2026-11-12');
 
-- E3. Restricción CHECK: el estado no está permitido
INSERT INTO Series (Titulo, Temporadas, Estado, GeneroId, MiembroId)
VALUES (N'Prueba', 1, N'Terminada', 1, 1);
 
-- E4. Borrar un miembro que tiene series (Restrict)
DELETE FROM Miembros WHERE Id = 4;

