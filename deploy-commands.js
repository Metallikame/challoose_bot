const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const clientId = '1323068679797342289'; // Remplace par ton ID de client (bot)
const guildId = '905517249400569866'; // Remplace par l'ID de ton serveur

const commands = [
    new SlashCommandBuilder().setName('chall').setDescription('Affiche le classement des échecs de challenge'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken('MTMyMzA2ODY3OTc5NzM0MjI4OQ.G1x2UR.rYIAa6eG7Nw2kp-uIlF5IucNW-dwS8jQeGHIKw'); // Remplace par ton token de bot

(async () => {
    try {
        console.log('Enregistrement des commandes slash...');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId), // Utiliser guild specific pour le développement
            { body: commands },
        );

        console.log('Commandes slash enregistrées avec succès !');
    } catch (error) {
        console.error(error);
    }
})();
