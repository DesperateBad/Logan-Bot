const ms = require("ms");
exports.run = (client, message, args, level) => {
  
  args.shift();
  
  if (!message.author.permissions.has("MANAGE_GUILD")) return message.channel.send("You're not allowed to do that ;-;");
  
  const member = message.mentions.users.first();
  if (!member) return message.channel.send("Please mention the member to mute!");
  
  const time = args.join(" ");
  if (!time) return message.channel.send("Please specify the time to mute the member for");
  
  client.muteHandler(message, ms(time));
  
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Moderation",
  name: "mute",
  description: "Mute a user for a specified amount of time.",
  usage: "mute @mention [time]"
};