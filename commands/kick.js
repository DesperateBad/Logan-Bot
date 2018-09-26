exports.run = (client, message, args) => {
  
  const member = message.mentions.members.first();
  
  if (!member) return message.channel.reply("Please mention a user to kick.");
  
  if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.reply("You don't have permission to kick members!");
  }
  
  if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
    message.channel.send("I do not have kick permissions, so cannot kick people ._.");
  }
  
  member.kick()
    .then(() => {
    if (message.serverConfig.announceKicks == "true") {
      const message = message.serverConfig.kickAnnouncementMessage.replace("{{member}}", member.user.tag);
      message.channel.send(message);
    } else return;
  })
    .catch();
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

  
  