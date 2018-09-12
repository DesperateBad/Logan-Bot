exports.run = async (client, message, args, level) => {

if (client.cooldownProvider.has(message.author.id)) {
  message.channel.send("That command has a cooldown of 1 hour, sorry ._.");
  return;
}
  
  let suggestionText = args.join(" ");
  
  // Fetch Bot Owner by id
  let user = client.fetchUser(client.config.ownerID)
   .then(user => {
      // Once promise returns with user, send user a DM
      user.send(`**From:** ${message.author.username} (ID: ${message.author.id})\n**Text: **` + suggestionText); 
   })
  
  
  // Start the cooldown
  client.cooldownProvider.add(message.author.id);
  
  setTimeout(() => {
    client.cooldownProvider.delete(message.author.id);
  }, 3600000);
  
};

exports.conf = {
  enabled: true,
  aliases: ['suggest'],
  permLevel: "Open"
};

exports.help = {
  name: "suggestion",
  description: "Sends a suggestion to my creator. Upon receiving the message, he will review it, and message you if he's going to implement it. WARNING: If a user uses this command for anything other than suggesting things, future suggestions from this user will be ignored.",
  usage: "suggestion [text]"
};
