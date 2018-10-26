const fs = require("fs");
exports.run = (client, message, args) => {

  function saveSayLog() {
    var file = '../log/say.txt';
    var datetime = '[' + new Date() + '] ';
    var author = '(' + message.author.username + message.author.discriminator + ')';
    var text = datetime + author + args.join(" ") + '\r\n';
    fs.appendFile(file, text, function (err) {
        if (err) return console.log(err);
        console.log('Successfully appended "' + text + '"');
    })
  };
  
  if (message.author.id == '497363115307171841') return message.channel.send("Tidal, you made me say bad things, so you can no longer make me say anything! >:(");
  
  if (!args) return message.channel.send("You have to give me something to say...");

  message.channel.send(args.join(" "));
  saveSayLog();

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  category: "Fun",
  name: "say",
  description: "Ill say what you want!",
  usage: "say [text]"
};
