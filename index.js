const {Client, GatewayIntentBits, Collection} = require('discord.js');
const fs = require('fs');
const cron = require('node-cron');
const trackFailures = require('./events/trackFailures');
const resetRanking = require('./events/resetRanking');
require('dotenv').config();

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages]});

// Charger les commandes
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is online!');
});

// Surveiller les messages pour les échecs de challenge
client.on('messageCreate', message => {
    trackFailures.execute(message);
});

// Planifier la réinitialisation chaque dimanche
cron.schedule('59 23 * * 0', () => {
    resetRanking.execute(client);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Une erreur s\'est produite en exécutant cette commande.', ephemeral: true
            });
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
