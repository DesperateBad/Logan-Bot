const Discord = require("discord.js");

class Embed extends Discord.RichEmbed {
  constructor(config = { footer: 'default' }) {
    super()
      .setColor(0xCFD9F9);
    if (config.footer === 'default' || !config.footer) {
      super.setFooter('Logan Bot © High-Fox 2018');
    }
  };
  
  addInlineField(title, content) {
    super.addField(title, content, true)
    return this;
  };
  
};

exports.Embed = Embed;