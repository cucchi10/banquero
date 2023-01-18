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
  dia varchar not null,
  entidad integer references entidad(id) not null,
  rubro integer references rubro(id) not null,
  tienda integer references tienda(id) not null,
  descuento varchar not null,
  tope_descuento varchar,
  consumo_optimo varchar,
  desde date,
  hasta date,
  detalle varchar,
  dia_reintegro varchar,
  link varchar,
  deleted bool not null default false
);
-- Inserta filas en la tabla entidad
INSERT INTO entidad (name) VALUES
  ('Sin entidad')
  ('Banco Bica'),
  ('Banco Cuidad'),
  ('Banco Nacion'),
  ('Banco Provincia'),
  ('BBVA'),
  ('Brubank'),
  ('Clarin 365'),
  ('Cuenta DNI'),
  ('Galicia'),
  ('HSBC'),
  ('ICBC'),
  ('Itaú'),
  ('Macro'),
  ('MODO'),
  ('Patagonia'),
  ('Personal Pay'),
  ('Santander Rio'),
  ('SuperVielle'),
  ('YPF APP'),
  ('Yoy');

-- Inserta filas en la tabla rubro
INSERT INTO rubro (name) VALUES
  ('Sin rubro')
  ('Bares'),
  ('Combustibles'),
  ('Farmacia'),
  ('Gastronomia'),
  ('Indumentaria'),
  ('Librerías'),
  ('Perfumeria'),
  ('Pedidos Ya'),
  ('Rappi'),
  ('Supermercados'),
  ('Transporte');


-- Inserta filas en la tabla tienda
INSERT INTO tienda (name) VALUES
  ('Sin tienda')
  ('Arco Iris'),
  ('Axion'),
  ('Cabify'),
  ('Carrefour'),
  ('Chango Mas'),
  ('Coto'),
  ('Coto Digital'),
  ('Dia'),
  ('Disco'),
  ('Eco'),
  ('El Puente'),
  ('Freddo'),
  ('Jumbo'),
  ('La Anónima'),
  ('La Gallega'),
  ('La Reina'),
  ('Libertad'),
  ('Peddios Ya'),
  ('Pedidos Ya'),
  ('Puppis'),
  ('Puma'),
  ('Toledo'),
  ('Unico'),
  ('Vea'),
  ('Yaguar'),
  ('YPF');
