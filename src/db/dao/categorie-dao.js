const { DAO } = require('./dao');

const getCategoriesCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM rubro ORDER BY name ASC;
`;

const getCategories = `
SELECT id AS ID , name AS Nombre FROM rubro ORDER BY name ASC;
`;

const getRubro = `
SELECT * FROM rubro
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

const getRubroExacto = `
SELECT * FROM rubro
WHERE lower(name) LIKE lower($1)
AND deleted = false;
`;

const restoreRubro = `
UPDATE rubro
SET deleted = false
WHERE id = $1
`;

const addRubro = `
INSERT INTO rubro (name)
VALUES ($1);
`;

class CategorieDAO extends DAO {
	constructor() {
		super();
	}

	async getCategories() {
		return this.queryOnly(getCategories);
	}

	async getCategoriesCommander() {
		return this.queryOnly(getCategoriesCommander);
	}

	async getRubro(value) {
		return this.query(getRubro, [value]);
	}

	async getRubroExacto(value) {
		return this.query(getRubroExacto, [value]);
	}

	async addRubro(name) {
		return this.query(addRubro, [name]);
	}

	async restoreRubro(id) {
		return this.query(restoreRubro, [id]);
	}

}

exports.CategorieDAO = CategorieDAO;