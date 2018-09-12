exports.run = (client, message, level) => {
    
  message.channel.send( { embed: { title: `Special Delivery for ${message.author.username}!`, color: 0xf29837, image: { url: client.getRandomImage("owl"), }, } } )
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
