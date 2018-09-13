exports.run = async (client, message, args, level) => {

    const { MessageAttachment } = require("discord.js");
    const input = args.join(" ");
    
    message.channel.startTyping();
    
    const attachment = new MessageAttachment("https://logan-bot-api.herokuapp.com/commands/changemymind/" + input);
    message.channel.send("Nice Memeing!~", attachment);
    
    
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
