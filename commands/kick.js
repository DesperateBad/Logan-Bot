exports.run = (client, message, args) => {
  
  const member = message.mentions.members.first();
  
  if (!member) return message.channel.reply("Please mention a user to kick.");
  
  if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.reply("You don't have permission to kick members!");
  }
  
  if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
    message.channel.send("I do not have kick permissions, so cannot kick that member ._.");
  }
  
  member.kick()
    .then(() => message.channel.send(`Successfully kicked ${member.user.username} from the server.`))
    .catch(message.channel.send(`I was unable to kick ${member.user.username}`));
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: "kick",
  description: "Kicks a member from the server.",
  usage: "kick @memberToKick"
};

  
  