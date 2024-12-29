const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.login('MTMyMzA2ODY3OTc5NzM0MjI4OQ.G1x2UR.rYIAa6eG7Nw2kp-uIlF5IucNW-dwS8jQeGHIKw');
