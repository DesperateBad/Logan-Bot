exports.run = (client, message, args, level) => {
  
  /* 
  -- Create poll function --
  Input: ?poll create text(Which is better, Cats or Dogs?) emojis(:cat:,:dog:)
  */
  
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: 'poll',
  description: 'Create or edit a poll that uses reactions for votes!',
  usage: 'poll'
};