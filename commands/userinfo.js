const { Embed } = require("../src/structures/Embed.js");
exports.run = (client, message, args, level) => {

	const member = message.mentions.members.first() ? message.mentions.members.first() : message.member;

  const joinedAt = client.getCleanDate(`${member.joinedAt}`);
  const createdAt = client.getCleanDate(`${member.user.createdAt}`);
  
  const userEmbed = new Embed()
    .setThumbnail(member.user.avatarURL)
    .setTitle(`Info for ${member.user.bot ? 'bot' : 'user'}: **${member.user.username}**`)
    .addInlineField('Username', `${member.user.tag}`)
    .addInlineField('User ID', `${member.id}`)
    .addInlineField('Account Creation Date', `${createdAt}`)
    .addInlineField('Server Join Date', `${joinedAt}`);

  message.channel.send(userEmbed);
  
};

exports.conf = {
	enabled: true,
	aliases: ['userinf', 'user'],
	permLevel: "Open"
};

exports.help = {
  category: 'Info',
	name: 'userinfo',
	description: 'Get information about yourself or another user!',
	usage: 'userinfo <@mention>'
};
