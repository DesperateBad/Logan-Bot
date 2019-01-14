exports.run = (client, message, args, level) => {

  if (!args[0]) return message.channel.send("Yeah sure i'll just roll a 0 sided dice");
  if (isNaN(args[0])) return message.channel.send("That isn't a number...");
  
  const side = client.getNumbersBetween(1, args[0]).random();

  message.channel.send(`You rolled a **${args[0]}** sided dice and got a **${side}**!`);

};

exports.conf = {
  enabled: true,
  aliases: ['rolldice'],
  permLevel: "Open"
};

exports.help = {
  category: "Utility",
  name: "diceroll",
  description: "Roll a dice ^-^",
  usage: "diceroll [number of sides]"
};

