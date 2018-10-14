exports.run = async (client, message, args, level) => {

const fs = require('fs');
const Jimp = require('jimp');
    
  const text = args.join(" ");
  
    if (!text) {
        return message.reply("But you have to give me text ._.");
    };
    
    var isLongText = text.length >= 34 ? Jimp.FONT_SANS_16_BLACK : Jimp.FONT_SANS_32_BLACK;
    
    function getTextSize(length) {
        if (length >= 34) {
            return Jimp.FONT_SANS_16_BLACK;
        } else {
            return Jimp.FONT_SANS_32_BLACK;
        }
    };
    
    message.channel.startTyping();
    
    Jimp.read('https://pm1.narvii.com/6763/81ea6408b036dddef541463ef9d46bf5783ff129v2_hq.jpg').then(function (image) {     
        
        Jimp.loadFont(isLongText).then(function(font) {
          image.print(font, 148, 292, { text: text.toUpperCase(), alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER }, 280).getBufferAsync(Jimp.MIME_JPEG);

        let outputfile = "./" + Math.random().toString(15).substr(2, 5) + "." + image.getExtension();
            image.write(outputfile, function () {
                
                message.channel.send({ files: [{ attachment: outputfile, name: "output.jpg" }]}).then(function () {
                    
                    fs.unlink(outputfile, (err) => {
                        if (err) throw err;
                        console.log(`Image Created in Guild: ${message.guild.name}`);
                        message.channel.stopTyping();
            });
          });
        });
      });
    }).catch(function (err) {
      console.error(err);
      message.channel.send(";-; I-I couldn't create the image, sorry.")
        
      message.channel.stopTyping();
    })
    
    message.channel.stopTyping();
};

exports.conf = {
  enabled: true,
  aliases: ['changemind'],
  permLevel: "Open"
};

exports.help = {
  name: "changemymind",
  description: "Make your own Steven Crowder \'Change My Mind\' sign!",
  usage: "changemymind [text]"
};
