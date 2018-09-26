const generator = require('sillyname');
exports.run = (client, message, level) => {
  
  let stupidName = generator();
  
  message.channel.send(stupidName);

};

exports.conf = {
  enabled: true,
  aliases: ['dumbname', 'sillyname'],
  permLevel: "Open"
};

exports.help = {
  name: 'stupidname',
  description: 'Don\'t know why you would use this, but you can.',
  usage: 'stupidname'
};