exports.run = (client, message, args) => {
  
  if (message.author.id == '497363115307171841') return message.channel.send("Tidal, you made me say bad things, so you can no longer make me say anything! >:(");
  
  if (!args) return message.channel.send("You have to give me something to say...");

  message.channel.send(args.join(" "));

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open",
  cooldown: 5000
};

exports.help = {
  category: "Fun",
  name: "say",
  description: "Ill say what you want!",
  usage: "say [text]"
};
