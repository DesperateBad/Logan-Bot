exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  const fs = require('fs')
  const path = require('path')
  const Canvas = require('canvas')

  const Image = Canvas.Image
  const canvas = Canvas.createCanvas(500, 344)
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
  };
  
  const img = new Image()
  img.onload = () => {

    ctx.drawImage(img, 0, 0)

    ctx.font = 'normal 29px Verdana'

    ctx.fillStyle = '#000'

    var maxWidth = 460;
    var lineHeight = 40;
    var x = 24;
    var y = 130;
    var text = args.join(" ");
    var date = client.getCleanCurrentDate();
    wrapText(ctx, text, x, y, maxWidth, lineHeight);
    
    ctx.fillStyle = '#3b3b3b';
    ctx.font;
    if (args.join(" ").length >= 125) {
      ctx.font = 'normal 20px Verdana';
    } else {
      ctx.font = 'normal 14px Verdana';
    }
    ctx.fillText(date, 24, 330);

    var m = ctx.measureText(args.join(" "))

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'none.jpg');
    message.channel.send('👌🏻', attachment);
  }
  img.onerror = err => {
    console.log(err)
  }
  img.src = 'https://cdn.pbrd.co/images/HJTKxd1.png'
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Memes",
  name: "trumptweet",
  description: "Make a fake trump tweet!",
  usage: "trumptweet [text]"
};