const Discord = require("discord.js");
exports.run = (client, message, level) => {

  /* const serverInfo = new Discord.RichEmbed()
    .setColor(0xCFD9F9)
    .setThumbnail(message.guild.iconURL)
    .setTitle(`Info for ${message.guild.name}`)
    .addField("Owner", message.guild.owner.user.username, true)
    .addfield("Members", guild.memberCount, true) */
  
	message.channel.send({
		embed: {
			color: 0xCFD9F9,
			author: {
				name: message.guild.name,
				icon_url: message.guild.iconURL
			},
			thumbnail: {
				url: message.guild.iconURL,
			},
			title: "Server Info",
			fields: [{
				name: "**Name**",
				value: `${message.guild.name}`,
				inline: true,
			},
			{
				name: "**Owner**",
				value: `${message.guild.owner}`,
				inline: true,
			},
			{
				name: "**Created Timestamp**",
				value: `${message.guild.createdTimestamp}`,
				inline: true,
			},
			{
				name: "**Members**",
				value: `${message.guild.memberCount}`,
				inline: true,
			},
			],
		}
	})
};

exports.conf = {
	enabled: true,
	aliases: ['serverinf', 'server'],
	permLevel: "Open"
};

exports.help = {
	category: "Info",
	name: 'serverinfo',
	description: 'Displays information about the current server.',
	usage: 'serverinfo'
};
