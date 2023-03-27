const { SlashCommandBuilder } = require('@discordjs/builders')
const { AttachmentBuilder } = require('discord.js')
const Parser = require('rss-parser');
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const MessageAttachment = 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('xkcd')
        .setDescription('Fetches a random XKCD comic'),
    
    async execute(interaction) {
        const parser = new Parser();
        const feed = await parser.parseURL('https://xkcd.com/rss.xml');
        const numComics = feed.items.length;
        const randomIndex = Math.floor(Math.random() * numComics);
        const comic = feed.items[randomIndex];
        const pageUrl = `https://xkcd.com/${comic.link.split('/').slice(-2)[0]}/`;
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