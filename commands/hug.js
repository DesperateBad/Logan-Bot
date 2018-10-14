exports.run = (client, message, args) => {

  const mentionedUser = message.mentions.users.first();

  if (!mentionedUser) return message.channel.send("Are you trying to hug dead spirits...?");

  if (mentionedUser.id === message.author.id) return message.channel.send({ embed: { color: 0xCFD9F9, description: `I think ${message.author.toString()} is a bit lonely...`, image: { url: "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif" } } });

  message.channel.send({ embed: { color: 0xf4aa42, description: `How lovely! ${message.author.toString()} just hugged ${mentionedUser.toString()}!`, image: { url: client.getRandomActionImage("hug") }, } });

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Fun",
  name: "hug",
  description: "Give someone a nice, warm hug :D",
  usage: "hug [@mention]"
};
