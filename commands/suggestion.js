exports.run = async (client, message, args, level) => {
  
  let suggestionText = args.join(" ");
  if (!suggestionText) return message.channel.send("Please provide a message to send to my creator.");
  
  // Fetch Bot Owner by id
  let user = client.fetchUser(client.config.ownerID)
   .then(user => {
      // Once promise returns with user, send user a DM
      user.send("**From:** " + message.author.toString() + " (ID: ${message.author.id})\n**Text:** " + suggestionText); 
   })
  
  
  // Start the cooldown
  client.cooldownHandler(3600000, message);

};

exports.conf = {
  enabled: true,
  aliases: ['suggest'],
  permLevel: "Open"
};

exports.help = {
  name: "suggestion",
  description: "Sends a suggestion to my creator. (Has a 24 hour cooldown)",
  usage: "suggestion [message]"
};
