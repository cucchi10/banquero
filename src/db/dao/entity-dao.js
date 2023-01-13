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

class EntitysDAO extends DAO {
	constructor() {
		super();
	}

	async getEntities() {
		return this.queryOnly(getEntities);
	}

	async getEntitiesCommander() {
		return this.queryOnly(getEntitiesCommander);
	}

	async getEntidad(value) {
		return this.query(getEntidad, value);
	}
}

exports.EntitysDAO = EntitysDAO;