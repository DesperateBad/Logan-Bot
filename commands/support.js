const Discord = require("discord.js");

exports.run = (client, message, args, level) => {

    const supportEmbed = new Discord.RichEmbed()
        .setTitle('Support me!')
        .setColor(0xCFD9F9)
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription('Want to see more commands and features? Make it easier by support me and my owner! If he knows people want more, he will give more! So show your love, say what you feel!')
        .addField('Upvote me!', '[Upvote](https://discordbots.org/bot/470864521842655252/vote)');
        // .addField('My owners Patreon!', '[Patreon]()')

    return message.channel.send({supportEmbed});
};

exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Open"
};
  
exports.help = {
    name: "support",
    description: "Ways to support me and my owner!",
    usage: "support"
 };
  