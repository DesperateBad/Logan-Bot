exports.run = async (client, message, args) => {
  
  const announcement = args.join(" ");
  
  var guilds = client.guilds.keyArray();
  
  guilds.forEach((guild) => {
      var textChannel = client.getDefaultChannel(guild);
      textChannel.send(announcement);
  }).catch((err) => {
    console.log(err);
    message.channel.send("Could not send message ;-;");
  })
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "globalmessage",
  description: "Send message to every server",
  usage: "globalmessage <text>"
};