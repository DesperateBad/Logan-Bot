exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name;
  message.reply(`Your permission level is: ${level} - ${friendly}`);
};

exports.conf = {
  enabled: true,
  aliases: ['mylevel', 'perms'],
  permLevel: "User"
};

exports.help = {
  name: "level",
  description: "Tells you your permission level.",
  usage: "level"
};
