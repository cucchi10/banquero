const { Command } = require('./command');
const { isNumber } = require('../utils/number');
const { isDate, formatDate } = require('../utils/date');
const { isValidHttpUrl } = require('../utils/http-url');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');
const { week, diasSemana } = require('../datos');

class CreateDiscountCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
	}

	async getDiasInput(input) {
		if (!input) {
			throw new Error('Debes enviar aunque sea un dia de la semana');
		}
		const inputIsNumber = isNumber(input);
		if (!inputIsNumber) {
			const daysArray = input.replace(/ y /g, ',').split(',');

			const receivedDays = [];

			daysArray.forEach(day => {
				if (diasSemana.includes(day.trim())) {
					receivedDays.push(day.trim());
				}
			});
			const result = receivedDays.sort((a, b) => {
				return diasSemana.indexOf(a) - diasSemana.indexOf(b);
			}).join(', ');
			if (!result || !result.length) throw new Error(`No se pudo encontrar ningun dia en tu mensaje, ${input}`);
			return result;
		}
		else {
			const inputExist = week[input];
			if (!inputExist) throw new Error(`${inputExist}, no es una opción valida, seleccione una opción usando el autocomplete o escriba el o los dias de la semana, separados por coma`);
			const reuslt = inputExist.name === 'Todos los Dias' ? 'lunes, martes, miercoles, jueves, viernes, sabado, domingo' : inputExist.name;
			return reuslt;
		}
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'cargar') {
			try {
				const diaInput = interaction.options.getString('dia');
				const dia = await this.getDiasInput(diaInput);

				const desdeInput = interaction.options.getString('desde');
				const hastaInput = interaction.options.getString('hasta');
				let desde = null;
				let hasta = null;
				if (desdeInput) {
					if (!isDate(desdeInput)) throw new Error(`No tiene un formato valido el dato ${desdeInput}, formatos validos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY`);
					desde = formatDate(desdeInput).toSQLDate();
					if (!desde) throw new Error(`Error al convertir ${desdeInput} a formato fecha SQL`);
				}
				if (hastaInput) {
					if (!isDate(hastaInput)) throw new Error(`No tiene un formato valido el dato ${hastaInput}, formatos validos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY`);
					hasta = formatDate(hastaInput).toSQLDate();
					if (!hasta) throw new Error(`Error al convertir ${hastaInput} a formato fecha SQL`);
				}


				const linkInput = interaction.options.getString('link');
				let link = null;
				if (linkInput) {
					if (!isValidHttpUrl(linkInput)) throw new Error(`El link debe ser un link con HTTP o HTTPS válido, ${linkInput} es invalido`);
					link = linkInput;
				}


				const entidadInput = interaction.options.getString('entidad');
				const rubroInput = interaction.options.getString('rubro');
				const tiendaInput = interaction.options.getString('tienda');
				const entidadIsNumber = isNumber(entidadInput);
				const rubroIsNumber = isNumber(rubroInput);
				const tiendaIsNumber = isNumber(tiendaInput);

				const { entidadValue: entidad, rubrodValue: rubro, tiendaValue: tienda } = await this.DescuentosDAO.getIdsVinculados({ entidad:entidadInput,
					entidadIsNumber, rubro:rubroInput, rubroIsNumber, tienda:tiendaInput, tiendaIsNumber });

				const descuentoInput = interaction.options.getString('descuento');
				let descuento = null;
				if (descuentoInput) {
					descuento = descuentoInput;
				}
				const consumo_optimoInput = interaction.options.getString('consumo_optimo');
				let consumo_optimo = null;
				if (consumo_optimoInput) {
					consumo_optimo = consumo_optimoInput;
				}
				const tope_descuentoInput = interaction.options.getString('tope_descuento');
				let tope_descuento = null;
				if (tope_descuentoInput) {
					tope_descuento = tope_descuentoInput;
				}
				const detalleInput = interaction.options.getString('detalle');
				let detalle = null;
				if (detalleInput) {
					detalle = detalleInput;
				}
				const dia_reintegroInput = interaction.options.getString('dia_reintegro');
				let dia_reintegro = null;
				if (dia_reintegroInput) {
					dia_reintegro = dia_reintegroInput;
				}


				const result = await this.DescuentosDAO.createOurUpdateDescuento({ dia, desde, hasta, link, entidad, rubro, tienda, descuento, consumo_optimo,
					tope_descuento, detalle, dia_reintegro });

				if (!result || !result.length) {
					throw new Error('Algo salio mal, intente nuevamente mas tarde');
				}
				await Command.reply(interaction, result);
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