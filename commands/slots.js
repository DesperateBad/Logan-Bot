// const mongoose = require('mongoose');

exports.run = async (client, message, args, level) => {
  
  /* const boardSchema = mongoose.Schema({
    username: String,
    wins: Number
  }); */
  
  const emojis = ['🍏', '🍊', '🍉', '🍇', '🍒', '🍐', '🍓', '🍋'];
  
  var rolls;
  
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
            msg.edit(" | " + roll() + " | " + roll() + " | " + roll() + " | ");
          }, 1500)
    const allEqual = array => array.every( e => e === array[0]);
    var messageArray = msg.content.split(" | ");
    if (allEqual(messageArray) == "true") {
      setTimeout(function() {
        message.channel.send(`**Congratulations! ${message.author.toString()} just matched 3 fruits in the slots machine!**\nBetter add them to the leaderboard, huh?`);
      }, 3000)
    //  mongoose.connect('mongodb://logan-bot:' + process.env.DB_PASS + '@ds115353.mlab.com:15353/logan-slots-board');
    } else {
      setTimeout(function() {
        message.channel.send("Oh darn, bad luck...");
      }, 1500);
    }
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