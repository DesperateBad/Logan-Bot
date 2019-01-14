const fetch = require("node-fetch");

exports.run = (client, message, args, level) => {

  fetch('https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke').then(res => res.json()).then(joke => {
    message.channel.send(`${joke.setup}\n\n**${joke.punchline}**`);
  });
  
};

exports.conf = {
  enabled: true,
  aliases: ['randomjoke'],
  permLevel: "Open"
};

exports.help = {
  category: "Fun",
  name: "joke",
  description: "Get a really random joke!",
  usage: "joke"
};