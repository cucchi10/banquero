const { EntitysDAO } = require('../db/dao/entity-dao');
const { CategorieDAO } = require('../db/dao/categorie-dao');
const { StoreDAO } = require('../db/dao/store-dao');

const { infoCommander } = require('../datos');

const entities = new EntitysDAO();
const rubros = new CategorieDAO();
const tiendas = new StoreDAO();

function deleteInfoCommander(type) {
	if (type === 'entidad') {
		infoCommander.entidades = null;
	}
	if (type === 'rubro') {
		infoCommander.rubros = null;
	}
	if (type === 'tienda') {
		infoCommander.tiendas = null;
	}
}

async function getEntidades() {

	if (!infoCommander.entidades) {
		const result = await entities.getEntitiesCommander();
		infoCommander.entidades = result;
	}

	return infoCommander.entidades;
}

async function getRubros() {

	if (!infoCommander.rubros) {
		const result = await rubros.getCategoriesCommander();
		infoCommander.rubros = result;
	}

	return infoCommander.rubros;
}

async function getTiendas() {

	if (!infoCommander.tiendas) {
		const result = await tiendas.getStoresCommander();
		infoCommander.tiendas = result;
	}

	return infoCommander.tiendas;
}


module.exports = {
	getEntidades,
	getRubros,
	getTiendas,
	deleteInfoCommander,
};