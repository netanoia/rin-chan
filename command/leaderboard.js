const Discord = require('discord.js');

module.exports = {
	leaderboard(message, command, cmdRegex, rinchan) {
		//what object?
		//await messages
		//call object leaderboard

		const filter = response => {
			return response.author.id === message.author.id;
		};

		message.channel.send('Leaderboard for what object?').then(() => {
			message.channel.awaitMessages(filter, {max:1, time:30000, errors: ['time']})
			.then(collected => {
				try{
					let object = rinchanSQL.getObject(collected.first().content);
					message.channel.send(this.objectLeaderboard(object,message)).catch(console.error);
				} catch(err) {
					message.channel.send(err.getEmbed('Leaderboard')).catch(console.error);
				}
			})
			.catch(collected => {
				message.channel.send('Another time perhaps');
			});
		});
	},
	 
	objectLeaderboard(object,message) {
		let board = this.getLeaderboard(object.name);
		
		let leaderboard = board.reduce(function (acc, user, index) {
			if (user.quantity > 0) {
					let usr = message.guild.members.cache.get(user.userId.substr(19));
            if(usr) {
					acc.rankEmbedString += (index+1) + '. ' + escapeMarkdown(usr.displayName) + ' ' + user.quantity + '\n';
            }
			}
			return acc;
		},{rankEmbedString:"",nicknameEmbedString:"",objectEmbedString:""});

		return new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle(`${capitalizeFirstLetter(object.name)} Leaderboard`)
        .addFields(
            { name: '\u200b', value:leaderboard.rankEmbedString, inline: true },
        );
	},

	showLeaderboard(message, command, cmdRegex, rinchan) {
		try {
			let object = rinchanSQL.getObject(getObjectType(command, cmdRegex));
			message.channel.send(this.objectLeaderboard(object,message)).catch(console.error);
		}catch(err) {
			message.channel.send(err.getEmbed('Leaderboard')).catch(console.error);
		}	
	},

	getLeaderboard(object) {
		let board = rinchanSQL.objectLeaderboard.all(object);

		board.sort((a, b) => {
			return b.quantity - a.quantity;
		});

		return board;
	},
};