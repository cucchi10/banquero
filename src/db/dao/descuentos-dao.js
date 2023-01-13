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
SELECT general.*, entidad.name AS Entidad Bancaria, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE general.deleted = false;
`;

const getDescuentosWithTienda = `
SELECT general.*, entidad.name as entidad_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.tienda = $3
AND general.deleted = false;
`;

const getDescuentosWithRubro = `
SELECT general.*, entidad.name as entidad_name, rubro.name as rubro_name
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.rubro = $3
AND general.deleted = false;
`;

const getDescuentosWithRubroANDTienda = `
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


class DescuentosDAO extends DAO {
	constructor() {
		super();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();

	}

	async getDescuentos() {
		const result = await this.queryOnly(getDescuentos);
		return result;
	}

	async getDescuentosCommander() {
		const result = await this.queryOnly(getDescuentosCommander);
		return result;
	}

	async getDescuentosSinRubroNiTienda(dia, entidad) {
		const result = await this.query(getDescuentos, [dia, entidad]);
		return result;
	}

	async getDescuentosConRubro(dia, entidad, rubro) {
		const result = await this.query(getDescuentosWithRubro, [dia, entidad, rubro]);
		return result;
	}

	async getDescuentosConTienda(dia, entidad, tienda) {
		const result = await this.query(getDescuentosWithTienda, [dia, entidad, tienda]);
		return result;
	}

	async getDescuentosConRubroYTienda(dia, entidad, rubro, tienda) {
		const result = await this.query(getDescuentosWithRubroANDTienda, [dia, entidad, rubro, tienda]);
		return result;
	}

	async getDescuentosInteraction({ dia, entidad, entidadIsNumber, rubro, rubroIsNumber, tienda, tiendaIsNumber }) {
		try {
			if (!dia || !entidad) {
				throw new Error(`Debes enviar ${!dia && !entidad ? 'un Dia y una Entidad' : !dia ? 'un Dia' : 'una Entidad'}`);
			}
			let entidadValue = entidad;
			let rubrodValue = rubro;
			let tiendaValue = tienda;

			if (!entidadIsNumber) {
				const result = await this.EntitysDAO.getEntidad(entidadValue);
				if (!result || !result.length) throw new Error(`No Existe Entidad con nombre parecido a ${entidadValue}`);
				entidadValue = result[0].id;
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

			if (!rubrodValue && !tiendaValue) {
				return this.getDescuentosSinRubroNiTienda(dia, entidad);
			}

			if (!tiendaValue) {
				return this.getDescuentosConRubro(dia, entidad, rubro);
			}

			if (!rubrodValue) {
				return this.getDescuentosConTienda(dia, entidad, tienda);
			}

			return this.getDescuentosConRubroYTienda(dia, entidad, rubro, tienda);
		}
		catch (error) {
			throw new Error(error.message);
		}
	}

}

exports.DescuentosDAO = DescuentosDAO;