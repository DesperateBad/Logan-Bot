const request = require("request");

exports.run = async (client, message, args) => {
  
var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    // "X-Mashape-Key": "q2wug03mwDmshyfRkgMDaBfM7iIVp1bbZNxjsnDdwiNYmaUVnR"
  'User-Agent': 'request'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var body = JSON.parse(body);
    console.log(body);
  }
}
 
request(options, callback);

};

exports.conf = {
  enabled: true,
  aliases: ['randomquote'],
  permLevel: "Open"
};

exports.help = {
  name: "quote",
  description: "Gives you a random quote!",
  usage: "quote"
};