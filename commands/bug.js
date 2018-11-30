exports.run = (client, message, args) => {
  
  if (!args) return message.channel.send("Please provide a message to send to my creator.");

  // Fetch Bot Owner by id
  let user = client.fetchUser(client.config.ownerID)
    .then(user => {
      // Once promise returns with user, send user a DM
      user.send("**From:** " + message.author.toString() + ` (id: ${message.author.id})\n**Text:** ` + args.join(" "));
  })
  
  user.send(`**Bug Report**\n__From:__${message.author.toString()}\n---\n${args.join(" ")}`);
};

exports.conf = {
  enabled: true,
  aliases: ['bugreport', 'reportbug', 'report'],
  permlevel: 'Open',
  cooldown: 100000
};

exports.help = {
  category: "Miscellaneous",
  name: "bug",
  description: "Use to report bugs, and ONLY to report bugs.",
  usage: "bug [text]"
};