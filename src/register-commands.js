require('dotenv').config({ path: 'deploy/.env' });
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');


async function registerCommands() {

	const searchTables = new SlashCommandBuilder()
		.setName('ver')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option
				.setName('seleccion')
				.setDescription('Selecciona una opcion para ver la lista completa!')
				.setRequired(true)
				.setAutocomplete(false)
				.addChoices({ value:'Entidades Bancarias', name:'Entidades Bancarias' },
					{ value:'Rubros', name:'Rubros' }, { value:'Tiendas', name:'Tiendas' }, { value:'Tabla Descuentos', name:'Tabla Descuentos' }));


	const updateTables = new SlashCommandBuilder()
		.setName('crear')
		.setDescription('Crea una Nueva Entidad Bancaria, Rubro o Tienda!')
		.addStringOption(option =>
			option
				.setName('seleccion')
				.setDescription('Selecciona una opcion para crear un nuevo campo!')
				.setRequired(true)
				.setAutocomplete(false)
				.addChoices({ value:'Entidades Bancarias', name:'Entidades Bancarias' },
					{ value:'Rubros', name:'Rubros' }, { value:'Tiendas', name:'Tiendas' }))
		.addStringOption(option =>
			option
				.setName('nombre')
				.setDescription('Escribe el Nombre par el nuevo campo!')
				.setRequired(true));

	const deleteTables = new SlashCommandBuilder()
		.setName('eliminar')
		.setDescription('Elimina una Entidad Bancaria, Rubro o Tienda!')
		.addStringOption(option =>
			option
				.setName('seleccion')
				.setDescription('Selecciona una opcion para eliminar un campo!')
				.setRequired(true)
				.setAutocomplete(false)
				.addChoices({ value:'Entidades Bancarias', name:'Entidades Bancarias' },
					{ value:'Rubros', name:'Rubros' }, { value:'Tiendas', name:'Tiendas' }, { value:'Tabla Descuentos', name:'Tabla Descuentos' }))
		.addStringOption(option =>
			option
				.setName('nombre')
				.setDescription('Escribe su ID o su Nombre para eliminarlo!')
				.setRequired(true));

	const searchMonday = new SlashCommandBuilder()
		.setName('lunes')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchTuesday = new SlashCommandBuilder()
		.setName('martes')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchWednesday = new SlashCommandBuilder()
		.setName('miercoles')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchThursday = new SlashCommandBuilder()
		.setName('jueves')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchFriday = new SlashCommandBuilder()
		.setName('viernes')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchSaturday = new SlashCommandBuilder()
		.setName('sabado')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));

	const searchSunday = new SlashCommandBuilder()
		.setName('domingo')
		.setDescription('Ver los descuentos Bancarios!')
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria de la que queres ver descuentos!')
				.setRequired(false)
				.setAutocomplete(true));


	const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

	const commands = [
		deleteTables,
		updateTables,
		searchTables,
		searchMonday,
		searchTuesday,
		searchWednesday,
		searchThursday,
		searchFriday,
		searchSaturday,
		searchSunday,
	]
		.map(command => command.toJSON());

	await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}

module.exports = {
	registerCommands,
};

