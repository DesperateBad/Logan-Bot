const request = require("request");
exports.run = (client, message, level) => {
  
  request({
    url: "http://api.adviceslip.com/advice",
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      message.channel.send(`${body.slip.advice}`);
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
  name: "advice",
  description: "Get some advice!",
  usage: "advice"
};