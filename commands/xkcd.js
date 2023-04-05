process.noDeprecation = true
fetch = require('node-fetch')
const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')
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
    const permalink = $('#middleContainer > a:first').attr('href')
    const cTitle = $('#ctitle').text();
    const imageUrl = 'https:' + $('#comic img').attr('srcset')
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(cTitle)
      .setURL(permalink)
      .setImage(imageUrl)
      .setFooter({ text: 'XKCD: A webcomic of romance, sarcasm, math, and language.', iconURL: 'https://www.explainxkcd.com/wiki/images/1/1f/xkcd_favicon.png' })
    await interaction.reply({ embeds: [embed] });
  }
}