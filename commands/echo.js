const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with the input')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('Your input')
                .setRequired(true)),
    
    async execute(interaction) {
        await interaction.reply(interaction.options.getString('input'));
    }
}