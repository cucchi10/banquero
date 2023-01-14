const { Command } = require('./command');

const { CategorieDAO } = require('../db/dao/categorie-dao');
const { EntitysDAO } = require('../db/dao/entity-dao');
const { StoreDAO } = require('../db/dao/store-dao');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

const { isNumber } = require('../utils/number');
const { CheckPermissions } = require('../utils/permissions');

const { infoList, infoCommander } = require('../datos');

class UpdateTablesCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'crear') {
			try {
				const { isChecked, errorMessagePermision } = CheckPermissions(interaction);
				if (!isChecked) {
					throw new Error(errorMessagePermision);
				}
				const input = interaction.options.getString('seleccion');
				const name = interaction.options.getString('nombre');
				const nameIsNumber = isNumber(name);
				if (nameIsNumber) throw new Error(`El Nombre de ${input} no puede ser solo numeros`);
				let message = null;
				if (input === 'Entidades Bancarias') {
					const entidadExist = await this.EntitysDAO.getEntidadExacto(name);
					if (!entidadExist) {
						throw new Error(`Error al Buscar ${name} en ${input}`);
					}
					else if (entidadExist && entidadExist.length && !entidadExist[0].deleted) {
						throw new Error(`Ya existe **${entidadExist[0].name}** en **${input}**`);
					}
					else if (entidadExist && entidadExist.length && entidadExist[0].deleted) {
						const restaurarEntidad = await this.EntitysDAO.restoreEntidad(entidadExist[0].id);
						if (!restaurarEntidad) throw new Error(`Error al restaurar **${name}** en **${input}**`);
						infoList.entidades = null;
						infoCommander.entidades = null;
						message = `Se Restauro **${entidadExist[0].name}** en **${input}** con Exito`;
					}
					else {
						const crearEntidad = await this.EntitysDAO.addEntidad(name);

						if (!crearEntidad || crearEntidad.length) throw new Error(`Error al crear **${name}** en **${input}**`);

						infoList.entidades = null;
						infoCommander.entidades = null;
						message = `Se creo con exito **${name}** en **${input}**`;
					}
				}
				else if (input === 'Rubros') {
					const rubroExist = await this.CategorieDAO.getRubroExacto(name);
					if (!rubroExist) {
						throw new Error(`Error al Buscar ${name} en ${input}`);
					}
					else if (rubroExist && rubroExist.length && !rubroExist[0].deleted) {
						throw new Error(`Ya existe **${rubroExist[0].name}** en **${input}**`);
					}
					else if (rubroExist && rubroExist.length && rubroExist[0].deleted) {
						const restaurarRubro = await this.CategorieDAO.restoreRubro(rubroExist[0].id);
						if (!restaurarRubro) throw new Error(`Error al restaurar **${name}** en **${input}**`);
						infoList.rubros = null;
						infoCommander.rubros = null;
						message = `Se Restauro **${rubroExist[0].name}** en **${input}** con Exito`;
					}
					else {
						const crearRubro = await this.CategorieDAO.addRubro(name);

						if (!crearRubro || crearRubro.length) throw new Error(`Error al crear **${name}** en **${input}**`);

						infoList.rubros = null;
						infoCommander.rubros = null;
						message = `Se creo con exito **${name}** en **${input}**`;
					}
				}
				else if (input === 'Tiendas') {
					const tiendaExist = await this.StoreDAO.getTiendaExacto(name);
					if (!tiendaExist) {
						throw new Error(`Error al Buscar ${name} en ${input}`);
					}
					else if (tiendaExist && tiendaExist.length && !tiendaExist[0].deleted) {
						throw new Error(`Ya existe **${tiendaExist[0].name}** en **${input}**`);
					}
					else if (tiendaExist && tiendaExist.length && tiendaExist[0].deleted) {
						const restaurarTienda = await this.StoreDAO.restoreTienda(tiendaExist[0].id);
						if (!restaurarTienda) throw new Error(`Error al restaurar **${name}** en **${input}**`);
						infoList.tiendas = null;
						infoCommander.tiendas = null;
						message = `Se Restauro **${tiendaExist[0].name}** en **${input}** con Exito`;
					}
					else {
						const creartienda = await this.StoreDAO.addTienda(name);

						if (!creartienda || creartienda.length) throw new Error(`Error al crear **${name}** en **${input}**`);

						infoList.tiendas = null;
						infoCommander.tiendas = null;
						message = `Se creo con exito **${name}** en **${input}**`;
					}
				}
				if (!message) throw new Error(`Error de Interacción en Creacion de **${name}** en **${input}**`);
				infoList.tabla_descuentos = null;
				await Command.reply(interaction, message);
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

exports.UpdateTablesCommand = UpdateTablesCommand;


// async createOrRestoreItem(name, input, getFunction, createFunction, restoreFunction) {
// 		try {
// 			const itemExist = await getFunction(name);
// 			console.log(itemExist);
// 			if (!itemExist) {
// 				throw new Error(`Error al buscar **${name}** en **${input}**`);
// 			}
// 			else if (itemExist && itemExist.length && !itemExist[0].deleted) {
// 				throw new Error(`Ya existe **${itemExist[0].name}** en **${input}**`);
// 			}
// 			else if (itemExist && itemExist.length && itemExist[0].deleted) {
// 				const restoredItem = await restoreFunction()(itemExist[0].id);
// 				if (!restoredItem) throw new Error(`Error al restaurar ${name} en ${input}`);
// 				return `Se ha restaurado **${itemExist[0].name}** en **${input}** con éxito`, null;
// 			}
// 			else {
// 				const createdItem = await createFunction()(name);
// 				if (!createdItem) throw new Error(`Error al crear ${name} en ${input}`);
// 				return `Se ha creado **${name} en **${input}** con éxito`, null;
// 			}
// 		}
// 		catch (error) {
// 			throw new Error(error.message);
// 		}
// 	}

// 	async handleInteraction(interaction) {
// 		if (interaction.commandName === 'crear') {
// 			try {
// 				const { isChecked, errorMessagePermision } = CheckPermissions(interaction);
// 				if (!isChecked) {
// 					throw new Error(errorMessagePermision);
// 				}
// 				const input = interaction.options.getString('seleccion');
// 				const name = interaction.options.getString('nombre');
// 				if (isNumber(name)) throw new Error(`El Nombre de **${input}** no puede ser solo numeros`);

// 				let message = null;
// 				switch (input) {
// 				case 'Entidades Bancarias':
// 					[message, infoList.entidades] = await this.createOrRestoreItem(name, input, this.EntitysDAO.getEntidadExacto.bind(this.EntitysDAO),
// 						this.EntitysDAO.addEntidad.bind(this.EntitysDAO),
// 						this.EntitysDAO.restoreEntidad.bind(this.EntitysDAO));
// 					break;
// 				case 'Rubros':
// 					[message, infoList.rubros] = await this.createOrRestoreItem(name, input, () => this.CategorieDAO.getRubroExacto,
// 						() => this.CategorieDAO.addRubro, () => this.CategorieDAO.restoreRubro);
// 					break;
// 				case 'Tiendas':
// 					[message, infoList.tiendas] = await this.createOrRestoreItem(name, input, () => this.StoreDAO.getTiendaExacto,
// 						() => this.StoreDAO.addTienda, () => this.StoreDAO.restoreTienda);
// 					break;
// 				default:
// 					throw new Error('Input no válido');
// 				}
// 				if (!message) throw new Error(`Error de Interacción en Creacion de **${name}** en **${input}**`);
// 				await Command.reply(interaction, message);
// 			}
// 			catch (error) {
// 				Command.reply(interaction, error.message);
// 			}
// 		}
// 		else {
// 			this.nextCommand.handleInteraction(interaction);
// 		}
// 	}