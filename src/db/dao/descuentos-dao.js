const { DAO } = require('./dao');
const { CategorieDAO } = require('./categorie-dao');
const { EntitysDAO } = require('./entity-dao');
const { StoreDAO } = require('./store-dao');

const { deleteinfoList } = require('../../datos');

const getDescuentosCommander = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE general.deleted = false;
`;

const getDescuentos = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE general.deleted = false;
`;

const getDescuentosConDia = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.deleted = false;
`;

const getDescuentosConEntidad = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name AS Entidad, rubro.name as Rubro, tienda.name as Tienda
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.deleted = false;
`;

const getDescuentosWithTiendaANDEntidad = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.tienda = $3
AND general.deleted = false;
`;

const getDescuentosWithTienda = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.tienda = $2
AND general.deleted = false;
`;

const getDescuentosWithRubro = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, rubro.name as rubro_name
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.rubro = $2
AND general.deleted = false;
`;

const getDescuentosWithRubroANDTiendaANDEtidad = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.rubro = $3
AND general.tienda = $4
AND general.deleted = false;
`;

const getDescuentoEspecifico = `
SELECT *
FROM general
WHERE lower(dia) LIKE lower($1)
AND entidad = $2
AND rubro = $3
AND tienda = $4
AND descuento = $5;
`;

const getDescuentosWithRubroANDTienda = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.rubro = $2
AND general.tienda = $3
AND general.deleted = false;
`;

const getDescuentosConEntidadYRubro = `
SELECT general.entidad, general.dia, general.rubro, general.tienda, general.descuento, general.tope_descuento, general.consumo_optimo, general.desde, general.hasta, general.detalle, general.dia_reintegro, general.link, entidad.name as entidad_name, rubro.name as rubro_name, tienda.name as tienda_name 
FROM general
JOIN entidad ON general.entidad = entidad.id
JOIN rubro ON general.rubro = rubro.id
JOIN tienda ON general.tienda = tienda.id
WHERE lower(dia) LIKE concat('%',lower($1),'%')
AND general.entidad = $2
AND general.rubro = $3
AND general.deleted = false;
`;

const deleteWithEntidad = `
UPDATE general
SET deleted = true
WHERE entidad = $1
`;
const deleteWithRubro = `
UPDATE general
SET deleted = true
WHERE rubro = $1
`;
const deleteWithTienda = `
UPDATE general
SET deleted = true
WHERE tienda = $1
`;

const getDescuentoById = `
SELECT *
FROM general
WHERE id = $1
`;

const deleteDescuentoById = `
UPDATE general
SET deleted = true
WHERE id = $1
`;

const cargandoDescuento = `
INSERT INTO general
(entidad,dia,rubro,tienda,descuento,tope_descuento,consumo_optimo,desde,hasta,detalle,dia_reintegro,link)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
`;

const restoreDescuento = `
UPDATE general
SET entidad=$1, dia=$2, rubro=$3, tienda=$4, descuento=$5, tope_descuento=$6, consumo_optimo=$7, desde=$8, hasta=$9, detalle=$10, dia_reintegro=$11, link=$12, deleted=false
WHERE id = $13;
`;

class DescuentosDAO extends DAO {
	constructor() {
		super();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();

	}

	async getDescuentoById(id) {
		const result = await this.query(getDescuentoById, [id]);
		return result;
	}

	async deleteDescuentoById(id) {
		const result = await this.query(deleteDescuentoById, [id]);
		return result;
	}

	async deleteWithEntidad(id) {
		const result = await this.query(deleteWithEntidad, [id]);
		return result;
	}
	async deleteWithRubro(id) {
		const result = await this.query(deleteWithRubro, [id]);
		return result;
	}
	async deleteWithTienda(id) {
		const result = await this.query(deleteWithTienda, [id]);
		return result;
	}

	async getDescuentos() {
		const result = await this.queryOnly(getDescuentos);
		return result;
	}
	async getDescuentosConDia(dia) {
		const result = await this.query(getDescuentosConDia, [dia]);
		return result;
	}

	async getDescuentosCommander() {
		const result = await this.queryOnly(getDescuentosCommander);
		return result;
	}

	async getDescuentosConEntidad(dia, entidad) {
		const result = await this.query(getDescuentosConEntidad, [dia, entidad]);
		return result;
	}

	async getDescuentosConRubro(dia, rubro) {
		const result = await this.query(getDescuentosWithRubro, [dia, rubro]);
		return result;
	}

	async getDescuentosConTienda(dia, tienda) {
		const result = await this.query(getDescuentosWithTienda, [dia, tienda]);
		return result;
	}

	async getDescuentosConTiendaYEntidad(dia, entidad, tienda) {
		const result = await this.query(getDescuentosWithTiendaANDEntidad, [dia, entidad, tienda]);
		return result;
	}

	async getDescuentosConEntidadYRubro(dia, entidad, rubro) {
		const result = await this.query(getDescuentosConEntidadYRubro, [dia, entidad, rubro]);
		return result;
	}

	async getDescuentosConRubroYTienda(dia, rubro, tienda) {
		const result = await this.query(getDescuentosWithRubroANDTienda, [dia, rubro, tienda]);
		return result;
	}

	async getDescuentosConRubroYTiendaYEntidad(dia, entidad, rubro, tienda) {
		const result = await this.query(getDescuentosWithRubroANDTiendaANDEtidad, [dia, entidad, rubro, tienda]);
		return result;
	}

	async createDescuento({ dia, desde, hasta, link, entidad, rubro, tienda, descuento,
		tope_descuento, consumo_optimo, detalle, dia_reintegro }) {
		const result = await this.query(cargandoDescuento, [entidad, dia, rubro, tienda, descuento, tope_descuento,
			consumo_optimo, desde, hasta, detalle, dia_reintegro, link]);
		return result;
	}

	async restoreDescuento({ id, dia, desde, hasta, link, entidad, rubro, tienda, descuento,
		tope_descuento, consumo_optimo, detalle, dia_reintegro }) {
		const result = await this.query(restoreDescuento, [entidad, dia, rubro, tienda, descuento, tope_descuento,
			consumo_optimo, desde, hasta, detalle, dia_reintegro, link, id]);
		return result;
	}

	async getDescuentoEspecifico({ dia, entidad, rubro, tienda, descuento }) {
		const result = await this.query(getDescuentoEspecifico, [dia, entidad, rubro, tienda, descuento]);
		return result;
	}

	async handleDescuentosOptions({ dia, entidad, rubro, tienda }) {

		if (!rubro && !tienda && !entidad) {
			return this.getDescuentosConDia(dia);
		}

		if (rubro && !tienda && !entidad) {
			return this.getDescuentosConRubro(dia, rubro);
		}

		if (!rubro && tienda && !entidad) {
			return this.getDescuentosConTienda(dia, tienda);
		}

		if (!rubro && !tienda && entidad) {
			return this.getDescuentosConEntidad(dia, entidad);
		}

		if (rubro && tienda && !entidad) {
			return this.getDescuentosConRubroYTienda(dia, rubro, tienda);
		}

		if (rubro && !tienda && entidad) {
			return this.getDescuentosConEntidadYRubro(dia, entidad, rubro);
		}

		if (!rubro && tienda && entidad) {
			return this.getDescuentosConTiendaYEntidad(dia, entidad, tienda);
		}

		if (rubro && tienda && entidad) {
			return this.getDescuentosConRubroYTiendaYEntidad(dia, entidad, rubro, tienda);
		}
		return null;
	}

	async getIdsVinculados({ entidad, entidadIsNumber, rubro, rubroIsNumber, tienda, tiendaIsNumber }) {
		let entidadValue = entidad;
		let rubrodValue = rubro;
		let tiendaValue = tienda;

		if (entidadValue && entidadValue !== ' ') {
			if (!entidadIsNumber) {
				const result = await this.EntitysDAO.getEntidad(entidadValue);
				if (!result || !result.length) throw new Error(`No Existe Entidad con nombre parecido a ${entidadValue}`);
				entidadValue = result[0].id;
			}
			else {
				const result = await this.EntitysDAO.getEntidadById(entidadValue);
				if (!result || !result.length) throw new Error(`No se encontro Entidad Bancaria con ID **${entidadValue}**`);
			}
		}

		if (rubrodValue && rubrodValue !== ' ') {
			if (!rubroIsNumber) {
				const result = await this.CategorieDAO.getRubro(rubrodValue);
				if (!result || !result.length) throw new Error(`No Existe Rubro con nombre parecido a ${rubrodValue}`);
				rubrodValue = result[0].id;
			}
			else {
				const result = await this.CategorieDAO.getRubroById(rubrodValue);
				if (!result || !result.length) throw new Error(`No se encontro Entidad Bancaria con ID **${rubrodValue}**`);
			}
		}

		if (tiendaValue && tiendaValue !== ' ') {
			if (!tiendaIsNumber) {
				const result = await this.StoreDAO.getTienda(tiendaValue);
				if (!result || !result.length) throw new Error(`No Existe Tienda con nombre parecido a ${tiendaValue}`);
				tiendaValue = result[0].id;
			}
			else {
				const result = await this.StoreDAO.getTiendaById(tiendaValue);
				if (!result || !result.length) throw new Error(`No se encontro Entidad Bancaria con ID **${tiendaValue}**`);
			}
		}

		return { entidadValue, rubrodValue, tiendaValue };
	}

	async getDescuentosInteraction({ dia, entidad, entidadIsNumber, rubro, rubroIsNumber, tienda, tiendaIsNumber }) {
		try {
			if (!dia) {
				throw new Error('Debes enviar un Día');
			}

			const { entidadValue, rubrodValue, tiendaValue } = await this.getIdsVinculados({ entidad, entidadIsNumber, rubro,
				rubroIsNumber, tienda, tiendaIsNumber });

			return this.handleDescuentosOptions({ dia, entidad:entidadValue, rubro:rubrodValue, tienda: tiendaValue });
		}
		catch (error) {
			throw new Error(error.message);
		}
	}

	async createOurUpdateDescuento({ dia, desde, hasta, link, entidad, rubro, tienda, descuento,
		tope_descuento, consumo_optimo, detalle, dia_reintegro }) {
		const descuentoExist = await this.getDescuentoEspecifico({ dia, entidad, rubro, tienda, descuento });
		if (!descuentoExist) throw new Error('Error al buscar el descuento para ver si esta repetido');
		if (descuentoExist && descuentoExist.length && !descuentoExist[0].deleted) throw new Error(`El cupon ID **${descuentoExist[0].id}** ya existe`);
		if (descuentoExist && descuentoExist.length && descuentoExist[0].deleted) {
			const result = await this.restoreDescuento({ id:descuentoExist[0].id, dia, desde, hasta, link, entidad, rubro, tienda, descuento,
				tope_descuento, consumo_optimo, detalle, dia_reintegro });
			if (!result || !result.length) throw new Error('El descuento ya existe, pero no se puedo restaurar');
			deleteinfoList('tabla_descuento');
			return 'Se restauro con exito el descuento!';
		}
		const result = await this.createDescuento({ dia, desde, hasta, link, entidad, rubro, tienda, descuento,
			tope_descuento, consumo_optimo, detalle, dia_reintegro });
		if (!result) throw new Error('Error al crear el nuevo descuento');
		deleteinfoList('tabla_descuento');
		return 'Se creo con exito el descuento' ;
	}


}

exports.DescuentosDAO = DescuentosDAO;