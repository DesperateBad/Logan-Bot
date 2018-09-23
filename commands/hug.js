exports.run = (client, message, args) => {
  
  const mentionedUser = message.mentions.users.first();
  
    if (!mentionedUser) return message.channel.send("Are you trying to hug dead spirits...?");
  
  if (mentionedUser.id === message.author.id) return message.channel.send({embed: { color: 0xf29837, description: `I think ${message.author.username} is a bit lonely...`, image: { url: "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif" }}});
  
  message.channel.send({ embed: { color: 0xf29837, description: `Aww! ${message.author.tag} just hugged ${mentionedUser.tag}!`, image: { url: client.getRandomActionImage("hug") }, } });
  
};

 exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Open"
};
  
exports.help = {
  name: "hug",
  description: "Give someone a nice, warm hug :D",
  usage: "hug [@mention]"
};