const fetch = require("node-fetch");
const { Embed } = require('../src/structures/Embed.js');

exports.run = async (client, message, args) => {
    
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) return message.channel.send("You gotta pat SOMETHING...!");
  
  if (mentionedUser.id === client.user.id) return message.channel.send("Oi, i\'m not a dog .-.");
  if (mentionedUser.id === message.author.id) return message.channel.send("Are you trying to pat yourself?");

  const embed = new Embed()
    .setDescription(`${mentionedUser.toString()} just got a nice pat from ${message.author.toString()}!`);
  
  await fetch('https://nekos.life/api/pat').then(res => res.json()).then(response => {
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
  name: "pat",
  description: "Give someone a cheerful lil pat",
  usage: "pat [@mention]"
};
