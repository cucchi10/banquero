const { DAO } = require('./dao');

const getStoresCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM tienda ORDER BY name ASC;
`;

const getStores = `
SELECT id AS ID, name AS Nombre FROM tienda ORDER BY name ASC;
`;

const getTienda = `
SELECT * FROM tienda
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

const getTiendaExacto = `
SELECT * FROM tienda
WHERE lower(name) LIKE lower($1)
AND deleted = false;
`;

const restoreTienda = `
UPDATE tienda
SET deleted = false
WHERE id = $1
`;

const addTienda = `
INSERT INTO tienda (name)
VALUES ($1);
`;

class StoreDAO extends DAO {
	constructor() {
		super();
	}

	async getStores() {
		return this.queryOnly(getStores);
	}

	async getTiendaExacto(value) {
		return this.query(getTiendaExacto, [value]);
	}

	async getStoresCommander() {
		return this.queryOnly(getStoresCommander);
	}

	async getTienda(value) {
		return this.query(getTienda, [value]);
	}

	async addTienda(name) {
		return this.query(addTienda, [name]);
	}

	async restoreTienda(id) {
		return this.query(restoreTienda, [id]);
	}
}

exports.StoreDAO = StoreDAO;