const { Command } = require('./command');
const { isNumber } = require('../utils/number');
const { isDate, formatDate } = require('../utils/date');
const { isValidHttpUrl } = require('../utils/http-url');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

class CreateDiscountCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'cargar') {
			try {
				const desdeInput = interaction.options.getString('desde');
				const hastaInput = interaction.options.getString('hasta');
				if (desdeInput && !isDate(desdeInput)) throw new Error(`No tiene un formato valido el dato ${desdeInput}, Formatos Validos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY`);
				if (hastaInput && !isDate(hastaInput)) throw new Error(`No tiene un formato valido el dato ${hastaInput}, Formatos Validos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY`);
				const linkInput = interaction.options.getString('link');
				if (linkInput && !isValidHttpUrl(linkInput)) throw new Error(`El link debe ser un link con HTTP o HTTPS válido, ${linkInput} es invalido`);

				const entidadInput = interaction.options.getString('entidad');
				const rubroInput = interaction.options.getString('rubro');
				const tiendaInput = interaction.options.getString('tienda');
				const entidadIsNumber = isNumber(entidadInput);
				const rubroIsNumber = isNumber(rubroInput);
				const tiendaIsNumber = isNumber(tiendaInput);

				const { entidadValue: entidad, rubrodValue: rubro, tiendaValue: tienda } = await this.DescuentosDAO.getIdsVinculados({ entidad:entidadInput,
					entidadIsNumber, rubro:rubroInput, rubroIsNumber, tienda:tiendaInput, tiendaIsNumber });

				const descuentoInput = interaction.options.getString('descuento');
				const tope_descuentoInput = interaction.options.getString('tope_descuento');
				const detalleInput = interaction.options.getString('detalle');
				const dia_reintegroInput = interaction.options.getString('dia_reintegro');

				const diaInput = interaction.options.getString('dia');

				const descuento = false;

				if (!descuento || !descuento.length) {
					throw new Error('No Hay Descuentos');
				}
				await Command.reply(interaction, descuento);
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

exports.CreateDiscountCommand = CreateDiscountCommand;