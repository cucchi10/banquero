CREATE TABLE entidad(
  id serial primary key not null,
  name varchar not null,
  deleted bool not null default false
);

CREATE TABLE rubro(
  id serial primary key not null,
  name varchar not null,
  deleted bool not null default false
);

CREATE TABLE tienda(
  id serial primary key not null,
  name varchar not null,
  deleted bool not null default false
);

CREATE TABLE general(
  id serial primary key not null,
  entidad integer references entidad(id) not null,
  dia varchar not null,
  rubro integer references rubro(id) not null,
  tienda integer references tienda(id) not null,
  descuento varchar not null,
  tope_descuento varchar not null,
  consumo_optimo varchar not null,
  desde date,
  hasta date,
  detalle varchar,
  dia_reintegro varchar,
  link varchar,
  deleted bool not null default false
);
-- Inserta filas en la tabla entidad
INSERT INTO entidad (name) VALUES
  ('Santander Rio'),
  ('Banco Nacion'),
  ('Banco Provincia'),
  ('Banco Cuidad'),
  ('SuperVielle'),
  ('Personal Pay'),
  ('BBVA'),
  ('Galicia'),
  ('Banco Bica'),
  ('Patagonia'),
  ('Brubank'),
  ('Macro'),
  ('ICBC'),
  ('HSBC'),
  ('Itaú'),
  ('Cuenta DNI'),
  ('MODO'),
  ('YPF APP'),
  ('Yoy'),
  ('Clarin 365');

-- Inserta filas en la tabla rubro
INSERT INTO rubro (name) VALUES
  ('Supermercados'),
  ('Combustibles'),
  ('Pedidos Ya'),
  ('Rappi'),
  ('Gastronomia'),
  ('Transporte'),
  ('Farmacia'),
  ('Perfumeria'),
  ('Bares'),
  ('Librerías'),
  ('Indumentaria');


-- Inserta filas en la tabla tienda
INSERT INTO tienda (name) VALUES
  ('Dia'),
  ('Carrefour'),
  ('Axion'),
  ('Jumbo'),
  ('Disco'),
  ('Vea'),
  ('Cabify'),
  ('Coto'),
  ('Coto Digital'),
  ('Toledo'),
  ('Puma'),
  ('Yaguar'),
  ('La Gallega'),
  ('Eco'),
  ('Chango Mas'),
  ('YPF'),
  ('La Anónima'),
  ('Puppis'),
  ('Freddo'),
  ('El Puente'),
  ('Pedidos Ya'),
  ('Libertad'),
  ('La Reina'),
  ('Unico'),
  ('la Bomba'),
  ('Arco Iris');

-- CREATE TABLE dia(
--   id serial primary key not null,
--   name varchar not null,
--   deleted bool not null default false
-- );

-- -- Inserta filas en la tabla dia
-- INSERT INTO dia (name) VALUES
--   ('lunes'),
--   ('martes'),
--   ('miércoles'),
--   ('jueves'),
--   ('viernes'),
--   ('sábado'),
--   ('domingo');

-- -- Usa una consulta recursiva para obtener todas las combinaciones de días de la semana
-- WITH RECURSIVE cte AS (
--   SELECT id, name, ARRAY[id] AS ids
--   FROM dia
--   UNION ALL
--   SELECT d.id, c.name || ', ' || d.name, ids || d.id
--   FROM cte c
--   JOIN dia d ON d.id NOT IN c.ids
-- )
-- SELECT name FROM cte ORDER BY name;

