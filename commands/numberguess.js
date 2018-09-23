exports.run = async (client, message, args) => {
  
  var number = Math.floor(Math.random() * 100) + 1;
  
  const filter = a => a.author.id == message.author.id;
  
  var guesses = 20;
  
message.channel.send("I\'m thinking of a number between 1 and 100, see if you can guess what it is!\nRespond with **stop/cancel** to end the game");
message.channel.awaitMessages(filter, { max: 20, time: 100000, errors: ['time'] })
  .then(collected => { 
  if (collected.content == "stop" || collected.content == "cancel") {
    return message.channel.send(`Too bad, my number was ${number}`)
  } else if (collected.content < number) {
    guesses -= 1;
    message.channel.send(`My number is higher than that! You have ${guesses} guesses left!`)
} else if (collected.content > number) {
    guesses -= 1;
    message.channel.send(`My number is lower than that! You have ${guesses} guesses left!`)
} else if (collected.content == number) {
    return message.channel.send(`Well done! You figured out that my number was ${number}, with ${guesses} guesses remaining.`)
}})
  .catch(collected => message.channel.send(`Times up! My number was ${number}! Try again next time!`));
};

exports.conf = {
  enabled: true,
  aliases: ['numbergame', 'ng', 'guessmynumber'],
  permLevel: "Open"
};

exports.help = {
  name: "numberguess",
  description: "I\'ll think of a number between 1 and 100, and you try to guess what it is within 20 guesses!",
  usage: "numberguess"
};