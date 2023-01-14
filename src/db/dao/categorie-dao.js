const { DAO } = require('./dao');

const getCategoriesCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name 
FROM rubro 
WHERE deleted = false
ORDER BY name ASC;
`;

const getCategories = `
SELECT id, name AS Nombre 
FROM rubro 
WHERE deleted = false
ORDER BY name ASC;
`;

const getRubro = `
SELECT * FROM rubro
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

const getRubroById = `
SELECT * FROM rubro
WHERE id = $1
`;

const getRubroExacto = `
SELECT * FROM rubro
WHERE lower(name) LIKE lower($1)
`;

const restoreRubro = `
UPDATE rubro
SET deleted = false
WHERE id = $1
`;

const deleteRubro = `
UPDATE rubro
SET deleted = true
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

	async getRubro(name) {
		return this.query(getRubro, [name]);
	}

	async getRubroById(id) {
		return this.query(getRubroById, [id]);
	}

	async getRubroExacto(name) {
		return this.query(getRubroExacto, [name]);
	}

	async addRubro(name) {
		return this.query(addRubro, [name]);
	}

	async restoreRubro(id) {
		return this.query(restoreRubro, [id]);
	}

	async deleteRubro(id) {
		return this.query(deleteRubro, [id]);
	}

}

exports.CategorieDAO = CategorieDAO;