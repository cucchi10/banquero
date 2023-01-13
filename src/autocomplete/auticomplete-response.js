const { getEntidades, getRubros, getTiendas } = require('./get-autocomplete-in-commands');


async function autocompleteResponse(interaction) {

	const focusedOption = interaction.options.getFocused(true);

	if (focusedOption.name === 'entidad') {

		const entidades = await getEntidades();
		if (!focusedOption.value || !focusedOption.value === ' ') return interaction.respond(entidades.slice(0, 25));
		const filtered = entidades.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));

		return interaction.respond(filtered.slice(0, 25));
	}

	if (focusedOption.name === 'rubro') {

		const rubros = await getRubros();
		if (!focusedOption.value || !focusedOption.value === ' ') return interaction.respond(rubros.slice(0, 25));
		const filtered = rubros.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));

		return interaction.respond(filtered.slice(0, 25));
	}

	if (focusedOption.name === 'tienda') {

		const tiendas = await getTiendas();
		if (!focusedOption.value || !focusedOption.value === ' ') return interaction.respond(tiendas.slice(0, 25));
		const filtered = tiendas.filter(choice => choice.name.toLowerCase().includes(focusedOption.value.toLowerCase()));

		return interaction.respond(filtered.slice(0, 25));
	}
}

module.exports = {
	autocompleteResponse,
};

