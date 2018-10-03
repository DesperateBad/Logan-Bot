const Discord = require("discord.js");
const SQLite = require("better-sqlite3");

exports.run = async (client, message, args, level, slotwin) => {
  
  client.cooldownHandler(30000, message);
  
  if (args[0]) {
    
    const action = args[0];
    
    if (action === "wins") {
        if (!message.mentions.users.first()) {
          return message.reply(`You currently have ${slotwin.wins} wins on this server!`);
        } else {
          var user = message.mentions.users.first();
          let userWins = client.getWins.get(user.id, message.guild.id);
          
          if (!userWins) {
            userWins = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, wins: 0 }
          }
          
          return message.channel.send(`${user.toString()} currently has ${userWins.wins} wins.`);
        }
    }
    
    if (action === "leaderboard") {
      const top10 = client.sql.prepare("SELECT * FROM slotwins WHERE guild = ? ORDER BY wins DESC LIMIT 10;").all(message.guild.id);

      const embed = new Discord.RichEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription("Here are the top 10 members with the most slot wins!")
        .setColor(0xCFD9F9);
      
      for (const data of top10) {
        embed.addField(client.users.get(data.user).tag + ` | ${data.wins} wins`, "\u200b");
      } 
      return message.channel.send({embed});
    }
    
    if (args[0] === "give") {
      
      if (!message.author.id == client.config.ownerID) return message.channel.send("Yeah, you're not allowed to do that o.o");
      
      const user = message.mentions.users.first();
      if (!user) return message.reply("You must mention someone or give their ID!");
 
      const winsToAdd = parseInt(args[2], 10);
      if (!winsToAdd) return message.reply("You didn't even tell me how many wins to give...")
 
      // Get their current points.=
      let userwins = client.getWins.get(user.id, message.guild.id);
      // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
      if (!userwins) {
        userwins = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, wins: 0 }
      }
      userwins.wins += winsToAdd;
 
      // And we save it!
      client.setWins.run(userwins);
 
      return message.channel.send(`${user.toString()} has received ${winsToAdd} wins from the owner!`);
      
      }
    }
  
  const emojis = ['🍏', '🍊', '🍉', '🍇', '🍒', '🍓', '🍋'];
  
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
      setTimeout(async function() {
            const allEqual = array => array.every( v => v === array[0] );
            var rolls = " | " + roll() + " | " + roll() + " | " + roll() + " | ";
            var messageArray1 = rolls.split(" | "); 
            var messageArray = messageArray1.filter(e => e != "");
            
            var text = allEqual(messageArray) ? rolls + "" : rolls + "\nOh darn, bad luck...";
            msg.edit(text)
      
            var isNot3 = text.endsWith("Oh darn, bad luck...");
        
                if (isNot3 === false) {
                      let userwins = client.getWins.get(message.author.id, message.guild.id);
                      if (!userwins) {
                        userwins = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, wins: 0 }
                      }
                  
                      userwins.wins++;
                      client.setWins.run(userwins);
                  
                      return message.reply(`You\'ve gained a win! You now have a total of **${userwins.wins}** wins! Ain\'t that dandy?`);
                }
    }, 1500)
  }).catch((err) => {
    return message.channel.send("Sorry, but there was an error rolling the slots machine ;-;");
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
  description: "Roll a slots machine, and see if you can get a match of 3 fruits! (Has a 5 min cooldown)",
  usage: "slots <leaderboard/wins>"
};