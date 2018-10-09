exports.run = (client, message, args) => {

  if (!args) return message.channel.send("You have to give me something to say...");

  message.channel.send(args);

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Owner"
};

exports.help = {
  name: "say",
  description: "Ill say what you want!",
  usage: "say [text]"
};
