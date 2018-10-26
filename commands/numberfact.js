const request = require("request");
exports.run = (client, message, args, level) => {
  
  let number;
  
  if (!args || isNaN(args[0])) { message.channel.send("That isn't a number so i've thought of a random one for you -_-"); number = Math.floor(Math.random() * 250) - 1; } else number = args[0];
  
  request({
    url: `http://numbersapi.com/${number}`,
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      message.channel.send(`${body}`);
    }
  });
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Miscellaneous",
  name: "numberfact",
  description: "Get an interesting fact about a random number, or a number you choose!",
  usage: "advice [number]"
};