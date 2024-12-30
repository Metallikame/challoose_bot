const fs = require('fs');
const path = './data/leaderboard.json';

module.exports = {
    name: 'chall',
    description: 'Affiche le classement des échecs de challenge',
    async execute(interaction) {
        // Charger le classement depuis le fichier leaderboard.json
        let leaderboard;
        try {
            leaderboard = JSON.parse(fs.readFileSync(path, 'utf8'));
        } catch (error) {
            return interaction.reply('Erreur lors du chargement du classement.');
        }

        // Trier les membres par score décroissant
        const sortedMembers = Object.entries(leaderboard.members)
            .sort((a, b) => b[1] - a[1]) // Trier les membres par score décroissant
            .slice(0, 10); // Optionnel : ne montrer que les 10 premiers

        // Générer le message de classement
        let leaderboardMessage = 'Classement des échecs de challenge :\n';
        if (sortedMembers.length === 0) {
            leaderboardMessage = 'Aucun échec de challenge enregistré.';
        } else {
            sortedMembers.forEach(([userId, score], index) => {
                const user = interaction.guild.members.cache.get(userId);
                if (user) {
                    leaderboardMessage += `${index + 1}. ${user.displayName}: ${score} échec(s)\n`;
                }
            });
        }

        // Répondre avec le message du classement
        return interaction.reply(leaderboardMessage);
    }
};
