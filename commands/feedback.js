const { SlashCommandBuilder } = require('discord.js');
const { client } = require('../bot.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feedback')
		.setDescription('Send feedback to the dev')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('The feedback you want to provide')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('anonymous')
                .setDescription('Whether to include your name in the feedback')
                .setRequired(false)),
	async execute(interaction) {
        const anon = interaction.options.getBoolean('anonymous')
        const user = anon ? interaction.user : 'An anonymous user'
        const linus = await client.users.fetch("840499419626995742")
		linus.send(`
        ${user} has provided feedback:
        ${content}
        `)
	},
};