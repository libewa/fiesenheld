const CLIENT_ID = "1049397374952419368"
var TOKEN = ""

// register command

const { REST, Routes } = require('discord.js');

const fs = require('fs');

try {
  const data = fs.readFileSync('./token.txt', 'utf8');
  console.log(data);
  TOKEN = data
} catch (err) {
  console.error(err);
}


const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'whomadethis',
    description: 'Links the GitHub repo.'
  }
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

// wait for interaction

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if (interaction.commandName === 'whomadethis') {
    await interaction.reply('https://github.com/libewa/fiesenheld \n is brought to you by [libewa](libewa.github.io) and [Nils-nonline](www.3d-game.org)')
  }
});

// login

client.login(TOKEN);