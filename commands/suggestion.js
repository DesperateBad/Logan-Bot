exports.run = async (client, message, args, level) => {

  if (!args) return message.channel.send("Please provide a message to send to my creator.");

  // Fetch Bot Owner by id
  let user = client.fetchUser(client.config.ownerID)
    .then(user => {
      // Once promise returns with user, send user a DM
      user.send("**From:** " + message.author.toString() + ` (id: ${message.author.id})\n**Text:** ` + args.join(" "));
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
  category: 'Miscellaneous',
  name: "suggestion",
  description: "Sends a suggestion to my creator. (Has a 24 hour cooldown)",
  usage: "suggestion [message]"
};
