exports.run = async (client, message, args, level) => {

if (!args[0]) return message.channel.send("Brain needs to say something!");

  const Discord = require("discord.js");
  const fs = require('fs')
  const path = require('path')
  const Canvas = require('canvas')

  const Image = Canvas.Image
  const canvas = Canvas.createCanvas(460, 460)
  const ctx = canvas.getContext('2d')

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }

  const img = new Image()
  img.onload = () => {

    ctx.drawImage(img, 0, 0)

    ctx.font = 'normal 17px Verdana'

    ctx.fillStyle = '#000'

    var maxWidth = 230;
    var lineHeight = 15;
    var x = 24;
    var y = 252;
    var text = args.join(" ");
    wrapText(ctx, text, x, y, maxWidth, lineHeight);

    var m = ctx.measureText(args.join(" "))

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'none.jpg');
    message.channel.send('Goddammit brain...', attachment);
  }
  img.onerror = err => {
    console.log(err)
  }
  img.src = 'https://i.imgur.com/huPsilK.jpg'

};

exports.conf = {
  enabled: true,
  aliases: ['ns'],
  permLevel: "Open"
};

exports.help = {
  category: "Memes",
  name: "nosleep",
  description: "When your brain just won't let you sleep",
  usage: "nosleep [text]"
};
