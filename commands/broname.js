exports.run = (client, message, args, level) => {
  message.channel.send(require("broseiden")());
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Miscellaneous",
  name: "broname",
  description: "Get a random bro name!",
  usage: "broname"
};