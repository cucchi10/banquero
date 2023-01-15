const { DAO } = require('./dao');
const { CategorieDAO } = require('./categorie-dao');
const { EntitysDAO } = require('./entity-dao');
const { StoreDAO } = require('./store-dao');

const getDescuentosCommander = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE general.deleted = false;
`;

const getDescuentos = `
SELECT general.*, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE general.deleted = false;
`;

const getDescuentosConDia = `
SELECT general.*, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.deleted = false;
`;

const getDescuentosConEntidad = `
SELECT general.*, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.deleted = false;
`;

const getDescuentosWithTiendaANDEntidad = `
SELECT general.*, entidad.name as entidad_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.tienda = $3
AND general.deleted = false;
`;

const getDescuentosWithTienda = `
SELECT general.*, entidad.name as entidad_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.tienda = $2
AND general.deleted = false;
`;

const getDescuentosWithRubro = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.rubro = $2
AND general.deleted = false;
`;

const getDescuentosWithRubroANDTiendaANDEtidad = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.rubro = $3
AND general.tienda = $4
AND general.deleted = false;
`;

const getDescuentosWithRubroANDTienda = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.rubro = $2
AND general.tienda = $3
AND general.deleted = false;
`;

const getDescuentosConEntidadYRubro = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.rubro = $3
AND general.deleted = false;
`;

const deleteWithEntidad = `
UPDATE general
SET deleted = true
WHERE entidad = $1
`;
const deleteWithRubro = `
UPDATE general
SET deleted = true
WHERE rubro = $1
`;
const deleteWithTienda = `
UPDATE general
SET deleted = true
WHERE tienda = $1
`;

const getDescuentoById = `
SELECT *
FROM general
WHERE id = $1
`;

const deleteDescuentoById = `
UPDATE general
SET deleted = true
WHERE id = $1
`;

class DescuentosDAO extends DAO {
	constructor() {
		super();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();

	}

	async getDescuentoById(id) {
		const result = await this.query(getDescuentoById, [id]);
		return result;
	}

	async deleteDescuentoById(id) {
		const result = await this.query(deleteDescuentoById, [id]);
		return result;
	}

	async deleteWithEntidad(id) {
		const result = await this.query(deleteWithEntidad, [id]);
		return result;
	}
	async deleteWithRubro(id) {
		const result = await this.query(deleteWithRubro, [id]);
		return result;
	}
	async deleteWithTienda(id) {
		const result = await this.query(deleteWithTienda, [id]);
		return result;
	}

	async getDescuentos() {
		const result = await this.queryOnly(getDescuentos);
		return result;
	}
	async getDescuentosConDia(dia) {
		const result = await this.query(getDescuentosConDia, [dia]);
		return result;
	}

	async getDescuentosCommander() {
		const result = await this.queryOnly(getDescuentosCommander);
		return result;
	}

	async getDescuentosConEntidad(dia, entidad) {
		const result = await this.query(getDescuentosConEntidad, [dia, entidad]);
		return result;
	}

	async getDescuentosConRubro(dia, rubro) {
		const result = await this.query(getDescuentosWithRubro, [dia, rubro]);
		return result;
	}

	async getDescuentosConTienda(dia, tienda) {
		const result = await this.query(getDescuentosWithTienda, [dia, tienda]);
		return result;
	}

	async getDescuentosConTiendaYEntidad(dia, entidad, tienda) {
		const result = await this.query(getDescuentosWithTiendaANDEntidad, [dia, entidad, tienda]);
		return result;
	}

	async getDescuentosConEntidadYRubro(dia, entidad, rubro) {
		const result = await this.query(getDescuentosConEntidadYRubro, [dia, entidad, rubro]);
		return result;
	}

	async getDescuentosConRubroYTienda(dia, rubro, tienda) {
		const result = await this.query(getDescuentosWithRubroANDTienda, [dia, rubro, tienda]);
		return result;
	}

	async getDescuentosConRubroYTiendaYEntidad(dia, entidad, rubro, tienda) {
		const result = await this.query(getDescuentosWithRubroANDTiendaANDEtidad, [dia, entidad, rubro, tienda]);
		return result;
	}

	async handleDescuentosOptions({ dia, entidad, rubro, tienda }) {

		if (!rubro && !tienda && !entidad) {
			return this.getDescuentosConDia(dia);
		}

		if (rubro && !tienda && !entidad) {
			return this.getDescuentosConRubro(dia, rubro);
		}

		if (!rubro && tienda && !entidad) {
			return this.getDescuentosConTienda(dia, tienda);
		}

		if (!rubro && !tienda && entidad) {
			return this.getDescuentosConEntidad(dia, entidad);
		}

		if (rubro && tienda && !entidad) {
			return this.getDescuentosConRubroYTienda(dia, rubro, tienda);
		}

		if (rubro && !tienda && entidad) {
			return this.getDescuentosConEntidadYRubro(dia, entidad, rubro);
		}

		if (!rubro && tienda && entidad) {
			return this.getDescuentosConTiendaYEntidad(dia, entidad, tienda);
		}

		if (rubro && tienda && entidad) {
			return this.getDescuentosConRubroYTiendaYEntidad(dia, entidad, rubro, tienda);
		}
		return null;
	}

	async getDescuentosInteraction({ dia, entidad, entidadIsNumber, rubro, rubroIsNumber, tienda, tiendaIsNumber }) {
		try {
			if (!dia) {
				throw new Error('Debes enviar un Día');
			}
			let entidadValue = entidad;
			let rubrodValue = rubro;
			let tiendaValue = tienda;

			if (entidadValue && entidadValue !== ' ') {
				if (!entidadIsNumber) {
					const result = await this.EntitysDAO.getEntidad(entidadValue);
					if (!result || !result.length) throw new Error(`No Existe Entidad con nombre parecido a ${entidadValue}`);
					entidadValue = result[0].id;
				}
			}

			if (rubrodValue && rubrodValue !== ' ') {
				if (!rubroIsNumber) {
					const result = await this.CategorieDAO.getRubro(rubrodValue);
					if (!result || !result.length) throw new Error(`No Existe Rubro con nombre parecido a ${rubrodValue}`);
					rubrodValue = result[0].id;
				}
			}

			if (tiendaValue && tiendaValue !== ' ') {
				if (!tiendaIsNumber) {
					const result = await this.StoreDAO.getTienda(tiendaValue);
					if (!result || !result.length) throw new Error(`No Existe Tienda con nombre parecido a ${tiendaValue}`);
					tiendaValue = result[0].id;
				}
			}

			return this.handleDescuentosOptions({ dia, entidad:entidadValue, rubro:rubrodValue, tienda: tiendaValue });
		}
		catch (error) {
			throw new Error(error.message);
		}
	}

}

exports.DescuentosDAO = DescuentosDAO;