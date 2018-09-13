exports.run = async (client, message, args, level) => {

    const { MessageAttachment } = require("discord.js");
    const input = args.join(" ");
    const url = await `https://logan-bot-api.herokuapp.com/commands/changemymind/${input}`;
    
    message.channel.startTyping();
    
    const attachment = new MessageAttachment(url);
    message.channel.send("Nice Memeing!~", attachment);
    
    message.channel.stopTyping();
    
    if (err) {
        message.channel.send("There was an error creating the image, sorry ;-;");
        message.channel.stopTyping();
    }
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
