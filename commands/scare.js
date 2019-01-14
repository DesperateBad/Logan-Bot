exports.run = async (client, message, args, level) => {
  
  const Canvas = require("canvas");
  const canvas = Canvas.createCanvas(800, 1000);
  const ctx = canvas.getContext('2d');
  const Image = Canvas.Image;

  const fetch = require("node-fetch");
  const Discord = require("discord.js");
  
  const userAvatar = message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
  
  let img = new Image();
  let avatar = new Image();
  
  avatar.src = `${userAvatar}`;
  avatar.onload = () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.rotate((Math.PI / 180) * -28);
    ctx.drawImage(avatar, 35, 570, 200, 200);
    ctx.restore();
  };
  
  img.src = 'https://cdn.glitch.com/b013ab07-2408-4579-95c8-e4eea004c64a%2Fscare.png?1542620233492';
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    
    const attachment = new Discord.Attachment(canvas.toBuffer(), 'none.jpg');
    message.channel.send('Scary! :ghost:', attachment);
  };

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Memes",
  name: "scare",
  description: "Everyones so scary!",
  usage: "scare <@mention>"
};