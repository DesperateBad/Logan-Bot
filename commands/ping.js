exports.run = (client, message, level) => {
  message.channel.send('Pong!').catch(console.error);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Miscellaneous",
  name: 'ping',
  description: 'Pong!',
  usage: 'ping'
};
