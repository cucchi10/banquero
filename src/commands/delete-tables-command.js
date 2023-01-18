const { Command } = require('./command');

const { CategorieDAO } = require('../db/dao/categorie-dao');
const { EntitysDAO } = require('../db/dao/entity-dao');
const { StoreDAO } = require('../db/dao/store-dao');
const { DescuentosDAO } = require('../db/dao/descuentos-dao');

const { isNumber } = require('../utils/number');
const { CheckPermissions } = require('../utils/permissions');

const { deleteInfoCommander } = require('../autocomplete/get-autocomplete-in-commands');

const { deleteinfoList } = require('../datos');

class DeleteTablesCommand extends Command {
	constructor(command) {
		super(command);
		this.DescuentosDAO = new DescuentosDAO();
		this.EntitysDAO = new EntitysDAO();
		this.CategorieDAO = new CategorieDAO();
		this.StoreDAO = new StoreDAO();
	}

	async handleDeleteIntracion(input, name, nameIsNumber) {
		try {
			if (input === 'Entidades Bancarias') {
				const entidadExist = nameIsNumber ? await this.EntitysDAO.getEntidadById(name)
					: await this.EntitysDAO.getEntidadExacto(name);
				if (!entidadExist) {
					throw new Error(`Error al buscar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
				}
				if (!entidadExist.length) {
					throw new Error(`No existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
				}
				else if (entidadExist && entidadExist[0].deleted) {
					throw new Error(`Ya estaba eliminado **${entidadExist[0].name}** en **${input}**`);
				}
				else {
					const eliminarEntidad = await this.EntitysDAO.deleteEntidad(entidadExist[0].id);

					if (!eliminarEntidad) throw new Error(`Error al eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);

					deleteInfoCommander('entidad');
					deleteinfoList('entidad');

					const eliminarVinculacion = await this.DescuentosDAO.deleteWithEntidad(entidadExist[0].id);

					if (!eliminarVinculacion) throw new Error(`Se elimino con exito **${entidadExist[0].name}** de **${input}**, pero se obtuvo un error al eliminar descuentos vinculados`);

					return `Se elimino con exito **${entidadExist[0].name}** de **${input}** y sus descuentos vinculados`;
				}
			}
			else if (input === 'Rubros') {
				const rubroExist = nameIsNumber ? await this.CategorieDAO.getRubroById(name)
					: await this.CategorieDAO.getRubroExacto(name);
				if (!rubroExist) {
					throw new Error(`Error al buscar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
				}
				else if (!rubroExist.length) {
					throw new Error(`No existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
				}
				else if (rubroExist && rubroExist[0].deleted) {
					throw new Error(`Ya estaba eliminado **${rubroExist[0].name}** en **${input}**`);
				}
				else {
					const eliminarRubro = await this.CategorieDAO.deleteRubro(rubroExist[0].id);

					if (!eliminarRubro) throw new Error(`Error al eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);


					deleteInfoCommander('rubro');
					deleteinfoList('rubro');

					const eliminarVinculacion = await this.DescuentosDAO.deleteWithRubro(rubroExist[0].id);

					if (!eliminarVinculacion) throw new Error(`Se elimino con exito **${rubroExist[0].name}** de **${input}**, pero se obtuvo un error al eliminar descuentos vinculados`);

					return `Se elimino con exito **${rubroExist[0].name}** de **${input}** y sus descuentos vinculados`;
				}
			}
			else if (input === 'Tiendas') {
				const tiendaExist = nameIsNumber ? await this.StoreDAO.getTiendaById(name)
					: await this.StoreDAO.getTiendaExacto(name);
				if (!tiendaExist) {
					throw new Error(`Error al buscar ${name} en ${input}`);
				}
				else if (!tiendaExist.length) {
					throw new Error(`No existe ${nameIsNumber ? 'ID' : 'nombre'} **${name}** en **${input}**`);
				}
				else if (tiendaExist && tiendaExist[0].deleted) {
					throw new Error(`Ya estaba eliminado **${tiendaExist[0].name}** en **${input}**`);
				}
				else {
					const eliminarTienda = await this.StoreDAO.deleteTienda(tiendaExist[0].id);

					if (!eliminarTienda) throw new Error(`Error al eliminar ${nameIsNumber ? 'ID' : 'nombre'} **${name}** de **${input}**`);

					deleteInfoCommander('tienda');
					deleteinfoList('tienda');

					const eliminarVinculacion = await this.DescuentosDAO.deleteWithTienda(tiendaExist[0].id);

					if (!eliminarVinculacion) throw new Error(`Se elimino con exito **${tiendaExist[0].name}** de **${input}**, pero se obtuvo un error al eliminar descuentos vinculados`);

					return `Se elimino con exito **${tiendaExist[0].name}** de **${input}** y sus descuentos vinculados`;
				}
			}
			else if (input === 'Tabla Descuentos') {
				if (!nameIsNumber) throw new Error(`Para eliminar un descuento de ${input}, debes enviar el ID`);
				const descuentoExist = await this.DescuentosDAO.getDescuentoById(name);
				if (!descuentoExist) {
					throw new Error(`Error al buscar **${name}** en **${input}**`);
				}
				else if (!descuentoExist.length) {
					throw new Error(`No existe ID **${name}** en **${input}**`);
				}
				else if (descuentoExist && descuentoExist[0].deleted) {
					throw new Error(`Ya estaba eliminado ID **${name}** en **${input}**`);
				}
				else {
					const eliminarDescuento = await this.DescuentosDAO.deleteDescuentoById(descuentoExist[0].id);
					if (!eliminarDescuento) throw new Error(`Error al eliminar ID **${name}** de **${input}**`);
					return `Se elimino con exito ID **${name}** de **${input}**`;
				}
			}
			return null;
		}
		catch (error) {
			throw new Error(error.messsage);
		}
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
				if (!message) throw new Error(`Error de interacción en creacion de **${name}** en **${input}**`);
				deleteinfoList('tabla_descuento');
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
