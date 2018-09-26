exports.run = (client, message, level) => {
  
  message.channel.send( { embed: { title: "Have a hamster *Squeak!*", color: message.serverConfig.embedColour, image: { url: client.getRandomImage("hamster"), }, } } )
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: "squeak",
  description: "Squee-Squeek! 🐹",
  usage: "squeak"
};
