const { DAO } = require('./dao');

const getEntitiesCommander = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM entidad ORDER BY name ASC;
`;

const getEntities = `
SELECT id AS ID, name AS Nombre FROM entidad ORDER BY name ASC;
`;

const getEntidad = `
SELECT * FROM entidad
WHERE lower(name) LIKE concat('%',lower($1),'%')
AND deleted = false;
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

	async getEntidadExacto(value) {
		return this.query(getEntidadExacto, [value]);
	}

	async getEntitiesCommander() {
		return this.queryOnly(getEntitiesCommander);
	}

	async getEntidad(value) {
		return this.query(getEntidad, [value]);
	}

	async addEntidad(name) {
		return this.query(addEntidad, [name]);
	}

	async restoreEntidad(id) {
		return this.query(restoreEntidad, [id]);
	}
}

exports.EntitysDAO = EntitysDAO;