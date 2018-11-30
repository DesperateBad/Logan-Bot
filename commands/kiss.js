const fetch = require("node-fetch");
const { Embed } = require('../src/structures/Embed.js');

exports.run = async (client, message, args) => {
    
  const mentionedUser = message.mentions.users.first();
  if (!mentionedUser) return message.channel.send("Are you trying to kiss the clouds...?");
  
  if (mentionedUser.id === client.user.id) return message.channel.send("Sorry, i\'ll pass ._.");
  if (mentionedUser.id === message.author.id) return message.channel.send("Good luck with that mate.");

  const embed = new Embed()
    .setDescription(`${mentionedUser.toString()}, you were just kissed by ${message.author.toString()}!`);
  
  await fetch('https://nekos.life/api/kiss').then(res => res.json()).then(response => {
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
  name: "kiss",
  description: "Romantic kisses all around!",
  usage: "kiss [@mention]"
};
