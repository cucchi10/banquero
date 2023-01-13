const { EntitysDAO } = require('../db/dao/entity-dao');
const { CategorieDAO } = require('../db/dao/categorie-dao');
const { StoreDAO } = require('../db/dao/store-dao');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

let entidadesSaved = null;
let rubrosSaved = null;
let tiendasSaved = null;
let descuentosSaved = null;

const entities = new EntitysDAO();
const rubros = new CategorieDAO();
const tiendas = new StoreDAO();
const descuentos = new DescuentosDAO();

async function getEntidades() {

	if (!entidadesSaved) {
		const result = await entities.getEntities();
		entidadesSaved = result;
	}

	return entidadesSaved;
}

async function getRubros() {

	if (!rubrosSaved) {
		const result = await rubros.getCategories();
		rubrosSaved = result;
	}

	return rubrosSaved;
}

async function getTiendas() {

	if (!tiendasSaved) {
		const result = await tiendas.getStores();
		tiendasSaved = result;
	}

	return tiendasSaved;
}

async function getTablaDescuentos() {

	if (!descuentosSaved) {
		const result = await descuentos.getDescuentos();
		descuentosSaved = result;
	}

	return descuentosSaved;
}


module.exports = {
	getEntidades,
	getRubros,
	getTiendas,
	getTablaDescuentos,
};