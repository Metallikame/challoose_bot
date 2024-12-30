const fs = require('fs');
const path = './data/leaderboard.json';

module.exports = {
    name: 'resetRanking',
    execute(client) {
        const guild = client.guilds.cache.get('TON_SERVEUR_ID'); // Remplacer par l'ID du serveur
        const leaderboard = JSON.parse(fs.readFileSync(path, 'utf8'));

        // Trouver le membre avec le plus grand score
        const topMember = Object.entries(leaderboard.members).sort((a, b) => b[1] - a[1])[0];

        if (topMember) {
            const userId = topMember[0];
            const user = guild.members.cache.get(userId);

            // Attribuer le rôle "@putain le CHAL !!!!"
            const role = guild.roles.cache.find(r => r.name === 'putain le CHAL !!!!');
            if (user && role) {
                user.roles.add(role);
            }
        }

        // Réinitialiser le classement
        leaderboard.members = {};
        fs.writeFileSync(path, JSON.stringify(leaderboard, null, 2));
    }
};
