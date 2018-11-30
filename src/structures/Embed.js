const Discord = require("discord.js");

class Embed extends Discord.RichEmbed {
  constructor() {
    super()
      .setFooter('Logan Bot © High-Fox 2018')
      .setColor(0xCFD9F9);
  };
  
  addInlineField(title, content) {
    super.addField(title, content, true)
    return this;
  };
  
};

exports.Embed = Embed;