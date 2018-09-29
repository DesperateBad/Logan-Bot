const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
//const sql = require("../slotwins.sqlite");

exports.run = (client, message, args, level, slotwins) => {
  
  if (args[0]) {
    
    const action = args.join(" ");
    
    if (action === "wins") {
        return message.reply(`You currently have ${slotwins.wins} wins on this server!`);
    }
    
    if (action === "leaderboard") {
      const top10 = client.sql.prepare("SELECT * FROM slotwins WHERE guild = ? ORDER BY wins DESC LIMIT 10;").all(message.guild.id);

      const embed = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription("Here are the top 10 members with the most slot wins!")
        .setColor(0xf4aa42);
      
      for (const data of top10) {
        embed.addField(client.users.get(data.user).tag, `${data.wins} wins`);
      } 
      return message.channel.send(embed);
    }
  }
  
  const emojis = ['🍏', '🍊', '🍉', '🍇', '🍒', '🍐', '🍓', '🍋'];
  
  function randomEmoji() {
    var randomEmoji = Math.floor(Math.random() * emojis.length);
    return emojis[randomEmoji];
  };
  
  function roll() {
    var roll = randomEmoji();
    return roll;
  };
  
  message.channel.send(" |---|---|---| ")
    .then(msg => {   
      setTimeout(function() {
            msg.edit(" | " + roll() + " |---|---| ");
          }, 500)
      setTimeout(function() {
            msg.edit(" | " + roll() + " | " + roll() + " |---| ");
          }, 1000)
      setTimeout(function() {
            const allEqual = array => array.every( e => e == array[0]);
            var rolls = " | " + roll() + " | " + roll() + " | " + roll() + " | ";
            var messageArray = rolls.split(" | "); 
            
            var text = allEqual(messageArray) ? " | " + roll() + " | " + roll() + " | " + roll() + " | \nYou've gained a win! You now have a total of **${curWins}** wins! Ain\'t that dandy?" : " | " + roll() + " | " + roll() + " | " + roll() + " | \nOh darn, bad luck...";
            msg.edit(text)
      
            var isNot3 = text.endsWith("Oh darn, bad luck...");
                if (isNot3 !== true) {
                      slotwins.wins++;
                      const curWins = slotwins.wins;
                    
                      return message.reply(`You\'ve gained a win! You now have a total of **${curWins}** wins! Ain\'t that dandy?`);
                    
                      client.setWins.run(slotwins);
                }
    }, 1500)
  }).catch((err) => {
    message.channel.send("Sorry, but there was an error rolling the slots machine ;-;");
    console.log(err);
  });
};
    
exports.conf = {
    enabled: true,
    aliases: [],
    permLevel: "Open"
};
  
exports.help = {
  name: "slots",
  description: "Roll a slots machine, and see if you can get a match of 3 fruits!",
  usage: "slots"
};