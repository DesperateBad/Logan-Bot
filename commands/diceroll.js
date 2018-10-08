exports.run = (client, message, level) => {
  
  const side = [ "1", "2", "3", "4", "5", "6" ].random();
  
  message.channel.send(`You rolled a ${side}!`);
  
};

exports.conf = {
  enabled: true,
  aliases: ['rolldice'],
  permLevel: "Open"
};

exports.help = {
  name: "diceroll",
  description: "Roll a six-sided dice ^-^",
  usage: "diceroll"
};
  
