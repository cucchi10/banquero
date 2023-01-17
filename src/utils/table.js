const Table = require('cli-table3');

function buildTable(data) {
	const table = new Table({
		chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
			'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
			'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
			'right': '║', 'right-mid': '╢', 'middle': '│' },
	});

	table.push(Object.keys(data[0]));
	data.forEach(item => {
		const value = Object.values(item) ? String(Object.values(item)).replace(/\b\w{30,}\b/g, word => word + '\n') : '';
		table.push(value);
	});

	return table.toString();
}

function buildTable2(data) {
	let table = '';
	table += '| **' + Object.keys(data[0]).join(' | ') + '** |\n';
	table += '|' + '-'.repeat((Object.keys(data[0]).join(' | ').length) * 1.25) + '|\n';
	data.forEach(item => {
		table += '| **' + Object.values(item).join(' | ') + '** |\n';
	});
	return table;
}

function buildTableDescuentos(data) {
	const tables = [];
	data.forEach(item => {
		const table = new Table({
			chars: { 'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗',
				'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝',
				'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼',
				'right': '║', 'right-mid': '╢', 'middle': '│' },
		});
		const headers = Object.keys(item);
		const values = Object.values(item);

		headers.forEach((header, i) => {
			if (header === 'dia') {
				values[i] = handleEditDia(values[i]);
			}
			else if (header === 'desde' || header === 'hasta') {
				values[i] = values[i]?.toLocaleDateString('es-AR') || '';
			}
			else if (header === 'link') {
				values[i] = values[i] ? String(values[i]).replace(/(.{30})/g, word => word + '\n') : '';
			}
			else {
				values[i] = values[i] ? String(values[i]).replace(/\b\w{30,}\b/g, word => word + '\n') : '';
			}

			table.push([header, values[i]]);
		});
		tables.push(table.toString());
	});


	return tables;
}

function handleEditDia(input) {
	const daysArray = input.split(',').map(day => day.trim());
	let dias = '';
	const firstDay = daysArray[0].trim();
	const lastDay = daysArray[daysArray.length - 1].trim();
	if (daysArray.length === 1) {
		dias = daysArray[0];
	}
	else if (daysArray.length === 2) {
		dias = daysArray.join(' y ');
	}
	else if (daysArray.length === 3) {
		if (firstDay === 'lunes' && lastDay === 'miercoles' || firstDay === 'martes' && lastDay === 'jueves' ||
    firstDay === 'miercoles' && lastDay === 'viernes' || firstDay === 'jueves' && lastDay === 'sabado' ||
    firstDay === 'viernes' && lastDay === 'domingo') {
			dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
		}
		else {
			dias = `${daysArray.slice(0, -1).join(', ')} y ${lastDay}`;
		}

	}
	else if (daysArray.length === 4) {
		if (firstDay === 'lunes' && lastDay === 'jueves' || firstDay === 'martes' && lastDay === 'viernes' ||
    firstDay === 'miercoles' && lastDay === 'sabado' || firstDay === 'jueves' && lastDay === 'domingo') {
			dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
		}
		else {
			dias = `${daysArray.slice(0, -1).join(', ')} y ${lastDay}`;
		}

	}
	else if (daysArray.length === 5) {
		if (firstDay === 'lunes' && lastDay === 'viernes' || firstDay === 'martes' && lastDay === 'sabado' ||
    firstDay === 'miercoles' && lastDay === 'domingo') {
			dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
		}
		else {
			dias = `${daysArray.slice(0, -1).join(', ')} y ${lastDay}`;
		}
	}
	else if (daysArray.length === 6) {

		if (firstDay === 'lunes' && lastDay === 'sabado') {
			dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
		}
		else if (firstDay === 'martes' && lastDay === 'domingo') {
			dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
		}
		else {
			dias = `${daysArray.slice(0, -1).join(', ')} y ${lastDay}`;
		}
	}
	else if (daysArray.length === 7) {
		dias = `${daysArray[0]} a ${daysArray[daysArray.length - 1]}`;
	}

	return dias;
}


// function handleEditDia(input) {
// 	const daysArray = input.split(',');
// 	let dias = '';
// 	daysArray.forEach((dia, index) => {
// 		const diatrim = dia.trim();
// 		if (index === 0) {
// 			dias += diatrim;
// 		}
// 		else if (index === daysArray.length - 1) {
// 			if (daysArray.length > 2) {
// 				dias += ` a ${diatrim}`;
// 			}
// 			else {
// 				dias += ` y ${diatrim}`;
// 			}
// 		}
// 		else if (diatrim === 'lunes' && daysArray[index + 1] === 'domingo') {
// 			dias += ` a ${diatrim}`;
// 		}
// 		else if (diatrim === 'lunes' && daysArray[index + 1] !== 'domingo') {
// 			dias += `, ${diatrim}`;
// 		}
// 		else if (diatrim === 'domingo' && daysArray[index - 1] !== 'lunes') {
// 			dias += `, ${diatrim}`;
// 		}
// 	});
// 	return dias;
// }

module.exports = {
	buildTable,
	buildTable2,
	buildTableDescuentos,
};