const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
const fetch = require('node-fetch')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xkcd')
        .setDescription('Fetches a random XKCD comic'),
    
    async execute(interaction) {
        const response = await fetch('https://xkcd.com/info.0.json');
        const comicCount = (await response.json()).num;
        const randomNum = Math.floor(Math.random() * comicCount) + 1;
        const comicResponse = await fetch(`https://xkcd.com/${randomNum}/info.0.json`);
        const comicData = await comicResponse.json();

        interaction.reply(comicData)

    }
}