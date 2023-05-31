const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Ask chat to vote')
    .addSubcommand(subcommand =>
      subcommand
        .setName('yes-no')
        .setDescription('To be or not to be, that\'s the question.')
        .addStringOption(option =>
          option.setName('question')
            .setDescription('Your question for chat to vote on.')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('options')
        .setDescription('Provide 2-4 options to choose between.')
        .addStringOption(option =>
          option.setName('question')
            .setDescription('The question to choose an answer to.')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('one')
            .setDescription('The first possible answer')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('two')
            .setDescription('The second possible answer')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('three')
            .setDescription('The third possible answer')
            .setRequired(false))
        .addStringOption(option =>
          option.setName('four')
            .setDescription('The fourth possible answer')
            .setRequired(false))),
  async execute(interaction) {
    const command = interaction.options.getSubcommand()
    var question = interaction.options.getString('question')
    var elements = []
    var embed;
    if (command === 'yes-no') {
      const yes = new ButtonBuilder()
  			.setCustomId('yes')
  			.setLabel('Yes')
  			.setStyle(ButtonStyle.Primary)
        .setEmoji('✅')
      const no = new ButtonBuilder()
  			.setCustomId('no')
  			.setLabel('No')
  			.setStyle(ButtonStyle.Primary)
        .setEmoji('❎')
      embed = new EmbedBuilder()
        .setTitle(`A new vote by ${interaction.user}!`)
        .setDescription(question)
      elements = [yes, no]
    } else if (command === 'options') {
      const one = interaction.options.getString('one')
      const two = interaction.options.getString('two')
      const three = interaction.options.getString('three')
      const four = interaction.options.getString('four')
      const option1 = new ButtonBuilder()
  			.setCustomId('option1')
  			.setLabel("Option 1")
  			.setStyle(ButtonStyle.Primary);
      const option2 = new ButtonBuilder()
  			.setCustomId('option2')
  			.setLabel("Option 2")
  			.setStyle(ButtonStyle.Primary);
      elements = [option1, option2]
      if (three != null) {
        const option3 = new ButtonBuilder()
    			.setCustomId('option3')
    			.setLabel("Option 3")
    			.setStyle(ButtonStyle.Primary);
        elements.push(option3)
      }
      if (four != null) {
        const option4 = new ButtonBuilder()
    			.setCustomId('option4')
    			.setLabel("Option 4")
    			.setStyle(ButtonStyle.Primary);
        elements.push(option4)
      }
      embed = new EmbedBuilder()
        .setTitle(`A new vote by ${interaction.user}!`)
        .setDescription(question)
        .addFields(
          { name: "Option 1", value: one, inline: true },
          { name: "Option 2", value: two, inline: true }
        )
        if (three != null) {
          embed.addFields({ name : "Option 3", value: three, inline: true })
        }
        if (four != null) {
          embed.addFields({ name : "Option 4", value: four, inline: true })
        }
    }
    
    const row = new ActionRowBuilder()
      .addComponents(elements)
    interaction.reply({components: [row], embeds: [embed]})
  }
}