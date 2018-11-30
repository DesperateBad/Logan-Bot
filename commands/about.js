const { Embed } = require("../src/structures/Embed.js");
exports.run = async (client, message, level) => {

  const { promisify } = require("util");
  const readdir = promisify(require("fs").readdir);
  const commandList = await readdir("./");

  const embed = new Embed()
    .setTitle(`${client.config.botName} | Release ${client.config.version}`)
    .setDescription("H-Heres some info about me if you're interested ^-^")
    .addInlineField("Developer:", "[High-Fox](https://github.com/high-fox)")
    .addInlineField("Library:", "[Discord.js](https://discord.js.org/#/)")
    .setThumbnail(client.user.avatarURL);
  
  message.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  aliases: ['info', 'inf'],
  permLevel: "Open"
};

exports.help = {
  category: "Info",
  name: "about",
  description: "Info about me :D",
  usage: "about"
};
