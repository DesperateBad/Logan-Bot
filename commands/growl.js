exports.run = (client, message, level) => {

  const bearJoke = [
    "What do you call a bear that jumps but never lands?\n**A Peter Panda!**",
    "How do you catch a fish without your fishing rod?\nWith your **BEAR** hands!",
    "What do you call a bear with no teeth?\nA **Gummy Bear!**",
    "What did the teddy bear say after dinner?\nI'm **stuffed!**",
    "I'm sorry I make bad jokes, please **BEAR** with me for a second."
  ].random();

  message.channel.send({ embed: { title: bearJoke, color: 0xCFD9F9, image: { url: client.getRandomImage("bear"), }, } });
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Animals",
  name: "growl",
  description: "Growl Growl! ʕ•ᴥ•ʔ",
  usage: "growl"
};
