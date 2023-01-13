const { Command } = require('./command');
const { buildTable } = require('../utils/table');

const { CategorieDAO } = require('../db/dao/categorie-dao');
const { EntitysDAO } = require('../db/dao/entity-dao');
const { StoreDAO } = require('../db/dao/store-dao');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');


const { infoList } = require('../datos');

class ListTablesCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'ver') {
			try {
				const input = interaction.options.getString('seleccion');
				let result = null;

				if (input === 'Entidades Bancarias') {
					if (!infoList.entidades) {
						infoList.entidades = await this.EntitysDAO.getEntities();
					}
					result = infoList.entidades;
				}
				else if (input === 'Rubros') {
					if (!infoList.rubros) {
						infoList.rubros = await this.CategorieDAO.getCategories();
					}
					result = infoList.rubros;
				}
				else if (input === 'Tiendas') {
					if (!infoList.tiendas) {
						infoList.tiendas = await this.StoreDAO.getStores();
					}
					result = infoList.tiendas;
				}
				else if (input === 'Tabla Descuentos') {
					if (!infoList.tabla_descuentos) {
						infoList.tabla_descuentos = await this.DescuentosDAO.getDescuentos();
					}
					result = infoList.tabla_descuentos;
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