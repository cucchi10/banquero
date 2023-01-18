const { DAO } = require('./dao');

const getStoresCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name 
FROM tienda 
WHERE deleted = false
ORDER BY name ASC;
`;

const getStores = `
SELECT id, name AS Tienda 
FROM tienda 
WHERE deleted = false
ORDER BY name ASC;
`;

const getTienda = `
SELECT * FROM tienda
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

const getTiendaById = `
SELECT * FROM tienda
WHERE id = $1
`;

const getTiendaExacto = `
SELECT * FROM tienda
WHERE lower(name) LIKE lower($1)
`;


const restoreTienda = `
UPDATE tienda
SET deleted = false
WHERE id = $1
`;

const deleteTienda = `
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

	async getTiendaById(id) {
		return this.query(getTiendaById, [id]);
	}

	async getTiendaExacto(name) {
		return this.query(getTiendaExacto, [name]);
	}

	async getStoresCommander() {
		return this.queryOnly(getStoresCommander);
	}

	async getTienda(name) {
		return this.query(getTienda, [name]);
	}

	async addTienda(name) {
		return this.query(addTienda, [name]);
	}

	async restoreTienda(id) {
		return this.query(restoreTienda, [id]);
	}

	async deleteTienda(id) {
		return this.query(deleteTienda, [id]);
	}
}

exports.StoreDAO = StoreDAO;