exports.run = async (client, message, level) => {
  
  if (client.cooldownProvider.has(message.author.id)) {
    if (message.author.id == client.config.ownerID) {
      client.cooldownProvider.delete(client.config.ownerID);
      return;
    } else {
      return message.channel.send("Please wait 1 hour between rolling the slot machine." + message.author);
    }
  }
  
  client.cooldownProvider.add(message.author.id);
    setTimeout(() => {
      client.cooldownProvider.delete(message.author.id);
    }, 3600000);
  
  const emojis = ['🍏', '🍊', '🍉', '🍇', '🍒', '🍐', '🍓', '🍋'];
  
  var rolls;
  
  function randomEmoji() {
    var randomEmoji = Math.floor(Math.random() * emojis.length);
    return emojis[randomEmoji];
  };
  
  function roll() {
    var roll1 = randomEmoji();
    var roll2 = randomEmoji();
    var roll3 = randomEmoji();
    
    var random3 = " | " + roll1 + " | " + roll2 + " | " + roll3 + " | ";
    return random3;
  };
  
  message.channel.send(roll()).then(msg => {   
      setTimeout(function() {
        for (rolls = 1; rolls < 3; rolls++) {
          setTimeout(function() {
            msg.edit(roll());
          }, 1000)
        }
      }, 1000)
    const allEqual = array => array.every( e => e === array[0]);
    var messageArray = msg.content.split(" | ");
    if (allEqual(messageArray) == "true") {
      message.channel.send(`Congratulations! ${message.author.toString()} just matched 3 fruits in the slots machine! How lucky!`);
    } else {
      message.channel.send("Oh darn, bad luck...");
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