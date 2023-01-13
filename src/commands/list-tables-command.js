const { Command } = require('./command');
const { getEntidades, getRubros, getTiendas, getTablaDescuentos } = require('../autocomplete/get-autocomplete-in-commands');
const { buildTable } = require('../utils/table');
class ListTablesCommand extends Command {
	constructor(command) {
		super(command);
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

				const table = buildTable(result);
				await Command.reply(interaction, '```' + table + '```');
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