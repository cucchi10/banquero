const { DAO } = require('./dao');

const getStoresMaped = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM tienda ORDER BY name ASC;
`;

const getTienda = `
SELECT * FROM tienda
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

class StoreDAO extends DAO {
	constructor() {
		super();
	}

	async getStores() {
		return this.queryOnly(getStoresMaped);
	}

	async getTienda(value) {
		return this.query(getTienda, value);
	}
}

exports.StoreDAO = StoreDAO;