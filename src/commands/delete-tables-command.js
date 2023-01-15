const { Command } = require('./command');

const { CategorieDAO } = require('../db/dao/categorie-dao');
const { EntitysDAO } = require('../db/dao/entity-dao');
const { StoreDAO } = require('../db/dao/store-dao');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

const { isNumber } = require('../utils/number');
const { CheckPermissions } = require('../utils/permissions');

const { infoList, infoCommander } = require('../datos');

class DeleteTablesCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();
	}

	async handleDeleteIntracion(input, name, nameIsNumber) {
		if (input === 'Entidades Bancarias') {
			const entidadExist = nameIsNumber ? await this.EntitysDAO.getEntidadById(name)
				: await this.EntitysDAO.getEntidadExacto(name);
			if (!entidadExist) {
				throw new Error(`Error al Buscar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
			}
			if (!entidadExist.length) {
				throw new Error(`No Existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
			}
			else if (entidadExist && entidadExist[0].deleted) {
				throw new Error(`Ya estaba Eliminado **${entidadExist[0].name}** en **${input}**`);
			}
			else {
				const eliminarEntidad = await this.EntitysDAO.deleteEntidad(entidadExist[0].id);

				if (!eliminarEntidad || eliminarEntidad.length) throw new Error(`Error al Eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);

				infoList.entidades = null;
				infoCommander.entidades = null;

				const eliminarVinculacion = await this.DescuentosDAO.deleteWithEntidad(entidadExist[0].id);

				if (!eliminarVinculacion || eliminarVinculacion.length) throw new Error(`Se Elimino con exito **${entidadExist[0].name}** de **${input}**, pero se Obtuvo un error al Eliminar Descuentos Vinculados`);

				return `Se Elimino con exito **${entidadExist[0].name}** de **${input}** y sus Descuentos Vinculados`;
			}
		}
		else if (input === 'Rubros') {
			const rubroExist = nameIsNumber ? await this.CategorieDAO.getRubroById(name)
				: await this.CategorieDAO.getRubroExacto(name);
			if (!rubroExist) {
				throw new Error(`Error al Buscar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
			}
			else if (!rubroExist.length) {
				throw new Error(`No Existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
			}
			else if (rubroExist && rubroExist[0].deleted) {
				throw new Error(`Ya estaba Eliminado **${rubroExist[0].name}** en **${input}**`);
			}
			else {
				const eliminarRubro = await this.CategorieDAO.deleteRubro(rubroExist[0].id);

				if (!eliminarRubro || eliminarRubro.length) throw new Error(`Error al Eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);

				infoList.rubros = null;
				infoCommander.rubros = null;

				const eliminarVinculacion = await this.DescuentosDAO.deleteWithRubro(rubroExist[0].id);

				if (!eliminarVinculacion || eliminarVinculacion.length) throw new Error(`Se Elimino con exito **${rubroExist[0].name}** de **${input}**, pero se Obtuvo un error al Eliminar Descuentos Vinculados`);

				return `Se Elimino con exito **${rubroExist[0].name}** de **${input}** y sus Descuentos Vinculados`;
			}
		}
		else if (input === 'Tiendas') {
			const tiendaExist = nameIsNumber ? await this.StoreDAO.getTiendaById(name)
				: await this.StoreDAO.getTiendaExacto(name);
			if (!tiendaExist) {
				throw new Error(`Error al Buscar ${name} en ${input}`);
			}
			else if (!tiendaExist.length) {
				throw new Error(`No Existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
			}
			else if (tiendaExist && tiendaExist[0].deleted) {
				throw new Error(`Ya estaba Eliminado **${tiendaExist[0].name}** en **${input}**`);
			}
			else {
				const eliminarTienda = await this.StoreDAO.deleteTienda(tiendaExist[0].id);

				if (!eliminarTienda || eliminarTienda.length) throw new Error(`Error al Eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);

				infoList.rubros = null;
				infoCommander.rubros = null;

				const eliminarVinculacion = await this.DescuentosDAO.deleteWithTienda(tiendaExist[0].id);

				if (!eliminarVinculacion || eliminarVinculacion.length) throw new Error(`Se Elimino con exito **${tiendaExist[0].name}** de **${input}**, pero se Obtuvo un error al Eliminar Descuentos Vinculados`);

				return `Se Elimino con exito **${tiendaExist[0].name}** de **${input}** y sus Descuentos Vinculados`;
			}
		}
		else if (input === 'Tabla Descuentos') {
			if (!nameIsNumber) throw new Error(`Para eliminar un Descuento de ${input}, debes enviar el ID`);
			const descuentoExist = await this.DescuentosDAO.getDescuentoById(name);
			if (!descuentoExist) {
				throw new Error(`Error al Buscar **${name}** en **${input}**`);
			}
			else if (!descuentoExist.length) {
				throw new Error(`No Existe ID **${name}** en **${input}**`);
			}
			else if (descuentoExist && descuentoExist[0].deleted) {
				throw new Error(`Ya estaba Eliminado ID **${name}** en **${input}**`);
			}
			else {
				const eliminarDescuento = await this.DescuentosDAO.deleteDescuentoById(descuentoExist[0].id);
				if (!eliminarDescuento || eliminarDescuento.length) throw new Error(`Error al Eliminar ID **${name}** de **${input}**`);
				return `Se Elimino con Exito ID **${name}** de **${input}**`;
			}
		}
		return null;
	}

	async handleInteraction(interaction) {
		if (interaction.commandName === 'eliminar') {
			try {
				const { isChecked, errorMessagePermision } = CheckPermissions(interaction);
				if (!isChecked) {
					throw new Error(errorMessagePermision);
				}
				const input = interaction.options.getString('seleccion');
				const name = interaction.options.getString('nombre');
				const nameIsNumber = isNumber(name);
				const message = await this.handleDeleteIntracion(input, name, nameIsNumber);
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

exports.DeleteTablesCommand = DeleteTablesCommand;
