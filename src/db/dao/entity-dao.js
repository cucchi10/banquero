const { DAO } = require('./dao');

const getEntitiesCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name 
FROM entidad 
WHERE deleted = false
ORDER BY name ASC;
`;

const getEntities = `
SELECT id, name AS Entidad 
FROM entidad 
WHERE deleted = false
ORDER BY name ASC;
`;

const getEntidad = `
SELECT * FROM entidad
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
`;

const getEntidadById = `
SELECT * FROM entidad
WHERE id = $1
`;

const getEntidadExacto = `
SELECT * FROM entidad
WHERE lower(name) LIKE lower($1)
`;

const restoreEntidad = `
UPDATE entidad
SET deleted = false
WHERE id = $1
`;

const deleteEntidad = `
UPDATE entidad
SET deleted = true
WHERE id = $1
`;

const addEntidad = `
INSERT INTO entidad (name)
VALUES ($1);
`;

class EntitysDAO extends DAO {
	constructor() {
		super();
	}

	async getEntities() {
		return this.queryOnly(getEntities);
	}

	async getEntidadById(id) {
		return this.query(getEntidadById, [id]);
	}

	async getEntidadExacto(name) {
		return this.query(getEntidadExacto, [name]);
	}

	async getEntitiesCommander() {
		return this.queryOnly(getEntitiesCommander);
	}

	async getEntidad(name) {
		return this.query(getEntidad, [name]);
	}

	async addEntidad(name) {
		return this.query(addEntidad, [name]);
	}

	async restoreEntidad(id) {
		return this.query(restoreEntidad, [id]);
	}

	async deleteEntidad(id) {
		return this.query(deleteEntidad, [id]);
	}
}

exports.EntitysDAO = EntitysDAO;