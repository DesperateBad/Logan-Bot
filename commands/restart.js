exports.run = (client, message) => {
  
  message.channel.send("R-Restarti-ing... Zzz... WOAH I'M BACK UP AGAIN")
    .then(msg => client.destroy())
    .then(() => client.login(process.env.TOKEN));
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Admin"
};

exports.help = {
  name: "restart",
  description: "Puts me to sleep, then wakes me back up again! c:",
  usage: "restart"
};