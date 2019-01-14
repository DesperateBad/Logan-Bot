exports.run = async (client, message, args, level) => {
  
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(1080, 1087);
  const ctx = canvas.getContext('2d');
  const Image = Canvas.Image;

  const fetch = require("node-fetch");
  const Discord = require("discord.js");
  
  const userAvatar = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
  
  let img = new Image();
  let avatar = new Image();
  
  img.src = 'https://pbs.twimg.com/media/DYkQSrLU8AA5bZx.jpg';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
  };
  
  avatar.src = `${userAvatar}`;
  avatar.onload = () => {
    ctx.drawImage(avatar, 300, 165, 410, 410);
    
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'none.jpg');
    message.channel.send(`${client.getEmoji('525247487825412097')}`, attachment);
  };

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Memes",
  name: "god",
  description: "Anyone can be a god through childrens eyes.",
  usage: "god <@mention>"
};