const { DAO } = require('./dao');

const getCategoriesMaped = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM rubro ORDER BY name ASC;
`;

const getRubro = `
SELECT * FROM rubro
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

class CategorieDAO extends DAO {
	constructor() {
		super();
	}

	async getCategories() {
		return this.queryOnly(getCategoriesMaped);
	}

	async getRubro(value) {
		return this.query(getRubro, value);
	}

}

exports.CategorieDAO = CategorieDAO;