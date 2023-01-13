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
		table.push(Object.values(item));
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


module.exports = {
	buildTable,
	buildTable2,
};