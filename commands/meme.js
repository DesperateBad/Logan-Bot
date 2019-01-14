const fetch = require("node-fetch");
const { Embed } = require('../src/structures/Embed.js');
const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  
  let meme = new Embed();
  
  await fetch("https://api.reddit.com/r/memes/top.json?sort=top&t=day&limit=1").then(res => res.json()).then(response => {
    meme.setImage(`${response.data.children[0].data.url}`)
        .setTitle('From r/memes/');
  })
  message.channel.send({ meme });
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 'Open'
};

exports.help = {
  category: 'Memes',
  name: 'meme',
  description: "Fetches the most recent post in the /r/memes sub-reddit!",
  usage: 'meme'
};