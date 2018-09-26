exports.run = (client, message, level) => {
    
  message.channel.send( { embed: { title: `Special Delivery for ${message.author.username}!`, color: message.serverConfig.embedColour, image: { url: client.getRandomImage("owl"), }, } } )
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: "hoot",
  description: "H-Hoot! H-Hoot! ^o,o^",
  usage: "hoot"
};
