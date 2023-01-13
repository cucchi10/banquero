const { DAO } = require('./dao');

const getEntitiesMaped = `
SELECT CAST(id AS VARCHAR(255)) AS value, name FROM entidad ORDER BY name ASC;
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
		return this.queryOnly(getEntitiesMaped);
	}

	async getEntidad(value) {
		return this.query(getEntidad, value);
	}
}

exports.EntitysDAO = EntitysDAO;