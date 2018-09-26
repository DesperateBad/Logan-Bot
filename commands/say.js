exports.run = (client, message, args) => {
  
  const text = args.join(" ");
  
  if (!text) return message.channel.send("You have to give me something to say...");
  
  message.channel.send(text);

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
