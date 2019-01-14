exports.run = (client, message, args, level) => {
  
  if (!args) return message.reply("You have to provide the msg's id!");
  const msgId = args[0];
  
  try {
    message.channel.fetchMessage(`${msgId}`).then((msg) => {
      msg.delete();
    });
    message.reply("Success!").then((success) => success.delete(2500));
  } catch(err) {
    return console.log(err)
  }
  
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner",
  hidden: true
};

exports.help = {
  name: "delmsg",
  description: "Delete a message by id",
  usage: "delmsg [msg id]"
};