exports.run = (client, message, level) => {

  message.channel.send({ embed: { title: "Have a hamster *Squeak!*", color: 0xCFD9F9, image: { url: client.getRandomImage("hamster"), }, } })
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Animals",
  name: "squeak",
  description: "Squee-Squeek! 🐹",
  usage: "squeak"
};
