process.noDeprecation = true

const { SlashCommandBuilder } = require('@discordjs/builders')
const { AttachmentBuilder } = require('discord.js')
const fetch = (await import('node-fetch')).default
const cheerio = require('cheerio')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xkcd')
        .setDescription('Fetches a random XKCD comic'),
    
    async execute(interaction) {
        const pageUrl = `https://c.xkcd.com/random/comic/`;
        const pageResponse = await fetch(pageUrl);
        const pageText = await pageResponse.text();
        const $ = cheerio.load(pageText);
        const imageUrl = `https:${$('#comic img').attr('src')}`;
        const cTitle = $('#ctitle').text();
        const response = await fetch(imageUrl);
        const buffer = await response.buffer();
        const attachment = new AttachmentBuilder(buffer)
        await interaction.reply({ content: cTitle, files: [attachment] });
    }
}