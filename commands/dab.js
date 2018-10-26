exports.run = (client, message, level) => {

  const dab = [
    '<o/',
    'c/-',
    '*dabs*',
    'https://media.giphy.com/media/3oz8xODcLLAxb8Qyju/giphy.gif',
    'https://media.giphy.com/media/lae7QSMFxEkkE/giphy.gif',
    'https://media.giphy.com/media/xkjsHi4t4iP3gI7We2/giphy.gif',
    'https://media.giphy.com/media/A4R8sdUG7G9TG/giphy.gif',
    'https://media.giphy.com/media/3oKIP6AYztSrFZ0AoM/giphy.gif',
    'https://media.giphy.com/media/3o7TKBkyx27bWph7IQ/giphy.gif',
    'https://media.giphy.com/media/3o7btYKPbnnjEMAGpG/giphy.gif',
    'https://media.giphy.com/media/3oEjI7M0cOXG0j4HWU/giphy.gif'
  ].random();

  message.channel.send(dab);

};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  category: "Miscellaneous",
  name: "dab",
  description: "Dab like a cool guy",
  usage: "dab"
};
