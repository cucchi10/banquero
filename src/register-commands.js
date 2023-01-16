require('dotenv').config({ path: 'deploy/.env' });
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

async function registerCommands() {

	const createDescuento = new SlashCommandBuilder()
		.setName('cargar')
		.setDescription('Cargar un descuento Bancario!')
		.addStringOption(option =>
			option
				.setName('dia')
				.setDescription('Días de la semana para el nuevo descuento')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('entidad')
				.setDescription('Nombre de la entidad para el nuevo descuento!')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('rubro')
				.setDescription('Nombre de la categoria para el nuevo descuento!')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option.setName('tienda')
				.setDescription('Nombre de la categoria para el nuevo descuento!')
				.setRequired(true)
				.setAutocomplete(true))
		.addStringOption(option =>
			option
				.setName('descuento')
				.setDescription('Descuento que generara!')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('tope_descuento')
				.setDescription('Tope descuento que generara!')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('consumo_optimo')
				.setDescription('Tope descuento que generara!')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('detalle')
				.setDescription('Detalle a tener en cuenta, algun dato que pueda aportar interes!')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('dia_reintegro')
				.setDescription('Cuando se hara el reintegro por usar este descuento?!')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('link')
				.setDescription('Link de TYC!')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('desde')
				.setDescription('Desde que Fecha se podra usar el Descuento! Formatos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY')
				.setRequired(false))
		.addStringOption(option =>
			option
				.setName('hasta')
				.setDescription('Hasta que Fecha se podra usar el Descuento! Formatos: DD/MM/YY, DD/MM/YYYY, DD-MM-YY o DD-MM-YYYY')
				.setRequired(false));

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
		createDescuento,
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

