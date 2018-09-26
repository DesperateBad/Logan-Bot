exports.run = (client, message, level) => {
  
  const dabs = ['<o/', 'c/-', '*dabs*', 'https://media.giphy.com/media/3oz8xODcLLAxb8Qyju/giphy.gif', 'https://media.giphy.com/media/lae7QSMFxEkkE/giphy.gif', 'https://media.giphy.com/media/xkjsHi4t4iP3gI7We2/giphy.gif'];
  
  var randomDab = Math.floor(Math.random() * dabs.length);
  
  message.channel.send(dabs[randomDab]);

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: "dab",
  description: "Dab like a cool guy",
  usage: "dab"
};