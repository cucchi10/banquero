const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

const infoCommander = {
	entidades: null,
	rubros: null,
	tiendas: null,
};

const infoList = {
	entidades: null,
	rubros: null,
	tiendas: null,
	tabla_descuentos: null,
};

const week = [];

async function generateCombinations(days, currentCombination = '', index = 0, result = []) {
	try {
		if (index === days.length) {
			result.push({ name: currentCombination.length ? currentCombination : 'Todos los Dias', value: (result.length).toString() });
			return;
		}

		await generateCombinations(days, currentCombination, index + 1, result);
		await generateCombinations(days, currentCombination.length ? currentCombination + ', ' + days[index]
			: currentCombination + days[index], index + 1, result);
		return result;
	}
	catch (error) {
		throw new Error(error.messsage);
	}
}

function deleteinfoList(type) {
	if (type === 'entidad') {
		infoList.entidades = null;
	}
	if (type === 'rubro') {
		infoList.rubros = null;
	}
	if (type === 'tienda') {
		infoList.tiendas = null;
	}
	if (type === 'tabla_descuento') {
		infoList.tabla_descuentos = null;
	}
}


module.exports = {
	diasSemana,
	infoCommander,
	infoList,
	week,
	generateCombinations,
	deleteinfoList,
};