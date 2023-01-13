require('dotenv').config({ path: 'deploy/.env' });

const { autocompleteResponse } = require('./src/autocomplete/auticomplete-response');

const { registerCommands } = require('./src/register-commands');
// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

const { NoCommand } = require('./src/commands/no-command');

const { SearchDiscountCommand } = require('./src/commands/search-descuento-command');
const { ListTablesCommand } = require('./src/commands/list-tables-command');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commandHandler =
	new SearchDiscountCommand(
		new ListTablesCommand(
			new NoCommand(null)));

// When the client is ready, run this code (only once)
client.once('ready', async () => {
	console.log('Ready!');
	await registerCommands();
});

client.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		commandHandler.handleInteraction(interaction);
	}
	else if (interaction.isAutocomplete()) {
		await autocompleteResponse(interaction);
	}
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);