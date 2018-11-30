const fetch = require("node-fetch");
const { Embed } = require('../src/structures/Embed.js');

exports.run = async (client, message, args) => {
    
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) return message.channel.send("You gotta hug SOMETHING...!");
  
  if (mentionedUser.id === client.user.id) return message.channel.send("Yeah, uh, I\'m not physically capable of hugging, sorry... ;-;");
  if (mentionedUser.id === message.author.id) return message.channel.send({ embed: { color: 0xCFD9F9, description: `I think ${message.author.toString()} is a bit lonely...`, image: { url: "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif" } } });

  const embed = new Embed()
    .setDescription(`How lovely! ${message.author.toString()} just hugged ${mentionedUser.toString()}!`);
  
  await fetch('https://nekos.life/api/hug').then(res => res.json()).then(response => {
    embed.setImage(response.url);
  });
    
  message.channel.send({ embed });

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Fun",
  name: "hug",
  description: "Give someone a nice, warm hug :D",
  usage: "hug [@mention]"
};
