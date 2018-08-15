exports.run = (client, message, args) => {

const fs = require('fs');
const Jimp = require('jimp');
    
    function JFont() {
    var rand = [Jimp.FONT_SANS_64_BLACK]
    return rand[Math.floor(Math.random() * rand.length)];
  }
    message.channel.startTyping();
    
    let memeText = args.slice(1).join(" ");
    let image = "https://imgflip.com/s/meme/Ancient-Aliens.jpg";
   
    Jimp.read(image).then(function (image) {

      image.resize(1024, 1024, Jimp.RESIZE_BEZIER);

      Jimp.loadFont(JFont()).then(function(font) {
        image.print(font, 20, 960, args.join(" "), Jimp.ALIGN_FONT_CENTER).getBuffer(Jimp.MIME_JPEG, nullFunction)

        let outputfile = "./" + Math.random().toString(36).substr(2, 5) + "." + image.getExtension();
        image.write(outputfile, function () {
          message.channel.send({
                            files: [{
                                attachment: outputfile,
                                name: "output.jpg"
                            }]
                        }).then(function () {
            fs.unlink(outputfile);
          });
        });
      });
    }).catch(function (err) {
      console.error(err);
      message.reply(";-; I-I couldn't create the image, sorry.")
    })
    
    function nullFunction(err, buffer) {
         console.log(buffer);
         if (err) throw err;
    }
    
    message.channel.stopTyping();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['aliensmeme'],
  permLevel: "0"
};

exports.help = {
  name: "aliens",
  description: "Make your own \'Aliens\' meme.",
  usage: "aliens [text]"
};
