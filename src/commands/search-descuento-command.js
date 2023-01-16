const { Command } = require('./command');
const { isNumber } = require('../utils/number');
const { diasSemana } = require('../datos');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

class SearchDiscountCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
	}

	async handleInteraction(interaction) {
		const interactionName = interaction.commandName;
		if (diasSemana.includes(interactionName)) {
			try {
				const entidadInput = interaction.options.getString('entidad');
				const rubroInput = interaction.options.getString('rubro');
				const tiendaInput = interaction.options.getString('tienda');
				const entidadIsNumber = isNumber(entidadInput);
				const rubroIsNumber = isNumber(rubroInput);
				const tiendaIsNumber = isNumber(tiendaInput);

				const descuentos = await this.DescuentosDAO.getDescuentosInteraction({ dia: interactionName, entidad: entidadInput, entidadIsNumber: entidadIsNumber,
					rubro : rubroInput, rubroIsNumber: rubroIsNumber, tienda: tiendaInput, tiendaIsNumber:tiendaIsNumber });

				if (!descuentos || !descuentos.length) {
					throw new Error('No hay descuentos');
				}
				await Command.reply(interaction, descuentos);
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

exports.SearchDiscountCommand = SearchDiscountCommand;