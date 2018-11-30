const Discord = require("discord.js");
const { Embed } = require("../src/structures/Embed.js");
exports.run = (client, message, level) => {
  
  const embed = new Embed()
    .setThumbnail(message.guild.iconURL)
    .setTitle(`Info for Server: **${message.guild.name}**`)
    .addInlineField("Owner:", `${message.guild.owner.toString()}`)
    .addInlineField("Created At:", `${client.getCleanDate(`${message.guild.createdAt}`)}`)
    .addInlineField("Members:", `${message.guild.members.filter(member => !member.user.bot).size}`)
    .addInlineField("Bots:", `${message.guild.members.filter(member => member.user.bot).size}`);

	message.channel.send({ embed });
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
