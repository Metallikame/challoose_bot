const fs = require('fs');
const path = './data/leaderboard.json';

// Charger ou initialiser le classement
let leaderboard = JSON.parse(fs.readFileSync(path, 'utf8') || '{"members": {}}');

module.exports = {
    name: 'trackFailures',
    execute(message) {
        // Vérifier si le message contient la chaîne recherchée
        if (message.content.includes("a fait échouer le challenge")) {
            // Vérifier si un membre est mentionné
            const mentionedUser = message.mentions.users.first();
            if (mentionedUser) {
                // Ajouter 1 au compteur du membre mentionné
                const userId = mentionedUser.id;
                leaderboard.members[userId] = (leaderboard.members[userId] || 0) + 1;

                // Sauvegarder le classement
                fs.writeFileSync(path, JSON.stringify(leaderboard, null, 2));

                // Réagir avec +1 au message
                message.react('👍');
            }
        }
    }
};
