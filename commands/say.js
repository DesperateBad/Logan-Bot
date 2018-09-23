exports.run = (client, message, args) => {
  
  const dabs = ['c/-', '<o/', '*dabs*', 'dabs', 'dab']
  const text = args.join(" ");
  
  let isDab = args.some(d => dabs.indexOf(d) >= 0)
  
  if (isDab == true) return message.channel.send("No dabbing");
  
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
    description: "Ill say what you want",
    usage: "say [text]"
  };
