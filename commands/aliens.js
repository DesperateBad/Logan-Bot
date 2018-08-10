exports.run = async (client, message, args) => {

const canvas = Canvas.createCanvas(500,436);
const background = await Canvas.loadImage('../images/aliens.jpg');

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
const attachment = new Discord.Attachment(canvas.toBuffer(), 'aliens.jpg');

message.channel.send(`Here:`, attachment);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "0"
};

exports.help = {
  name: "aliens",
  description: "Make your own \'Aliens\' meme.",
  usage: "aliens [text]"
};