const { Command } = require('./command');
const { getEntidades, getRubros, getTiendas, getTablaDescuentos } = require('../autocomplete/get-autocomplete-in-commands');

class ListTablesCommand extends Command {
	constructor(command) {
		super(command);
	}

	buildTable(data) {
		let table = '';
		table += '| **' + Object.keys(data[0]).join(' | ') + '** |\n';
		table += '|' + '-'.repeat((Object.keys(data[0]).join(' | ').length) * 1.25) + '|\n';
		data.forEach(item => {
			table += '| **' + Object.values(item).join(' | ') + '** |\n';
		});
		return table;
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'ver') {
			try {
				const input = interaction.options.getString('seleccion');
				let result = null;

				if (input === 'Entidades Bancarias') {
					result = await getEntidades();
				}
				else if (input === 'Rubros') {
					result = await getRubros();
				}
				else if (input === 'Tiendas') {
					result = await getTiendas();
				}
				else if (input === 'Tabla Descuentos') {
					result = await getTablaDescuentos();
				}

				if (!result || !result.length) throw new Error('No Hay Datos Que Mostrar');

				const table = this.buildTable(result);

				await Command.reply(interaction, table);
			}
			catch (error) {
				Command.reply(interaction, error.message);
			}
		}
		else {
			this.nextCommand.handleInteraction(interaction);
		}
	}

}

exports.ListTablesCommand = ListTablesCommand;