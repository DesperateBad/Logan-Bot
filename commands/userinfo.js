exports.run = (client, message, args, level) => {
  
const memberMention = message.mentions.users.first();

const member = memberMention ? memberMention : message.author;
	
   message.channel.send({
      embed: {
	  color: 0xCFD9F9,
	  author: {
	       name: "User Info",
	  },
	  thumbnail: {
	       url: `${member.avatarURL}`,
	  },
	  fields: [
	      {
		 name: '**Username**',
		 value: `${member.username}`,
		 inline: true,
	      },
	      {
		 name: '**ID**',
		 value: `${member.id}`,
		 inline: true,
	      },
	      {
		 name: '**Account Creation Date**',
		 value: `${member.createdAt}`,
	      },
	      {
		 name: '**Bot Account**',
		 value: `${member.bot}`,
	      },
	   ],
        }
    })
};

exports.conf = {
  enabled: true,
  aliases: ['userinf'],
  permLevel: "User"
};

exports.help = {
  name: 'userinfo',
  description: 'Get information about yourself or another user!',
  usage: 'userinfo'
};
