exports.run = async (client, message, args, level) => {

const Discord = require("discord.js");
const fs = require('fs')
const path = require('path')
const Canvas = require('canvas')

const Image = Canvas.Image
const canvas = Canvas.createCanvas(622,727)
const ctx = canvas.getContext('2d')

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
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
  
ctx.font = 'normal 20px Verdana'
  
ctx.fillStyle = '#000'

var maxWidth = 210;
var lineHeight = 20;
var x = 49;
var y = 99;
var text = args.join(" ");
wrapText(ctx, text, x, y, maxWidth, lineHeight); 

var m = ctx.measureText(args.join(" "))


  const attachment = new Discord.Attachment(canvas.toBuffer(), 'quid.png');
  message.channel.send('You burn that paper!', attachment);
}
img.onerror = err => {
  console.log(err)
}
img.src = 'https://i.imgur.com/n5JdAAs.jpg'
  
};

exports.conf = {
  enabled: true,
  aliases: ['bp'],
  permLevel: "Open"
};

exports.help = {
  name: "burnpaper",
  description: "Burn the stupid paper",
  usage: "burnpaper [text]"
};