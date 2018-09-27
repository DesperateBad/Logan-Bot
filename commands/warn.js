exports.run = (client, message, [mention, ...text]) => {
  
  const member = message.mentions.members.first();
  const reasonText = text.join(" ");
  
  // const serverWarns = message.serverWarns;
  // const overrides = client.serverWarns.get(message.guild.id);
  
  if (!member) return message.channel.send("You have to mention a user to warn.");
  if (!reasonText) return message.channel.send("Please provide a message to send as a warning.");
  
  // if (!client.serverWarns.has(message.guild.id)) client.serverWarns.set(message.guild.id, { "warns": [] } )
  
  // client.serverWarns.push(message.guild.id, "warns",
  
  member.send(`Hello, ${member.toString()}\nYou are recieving this message because an admin has decided to warn you on one of their servers.\n**Admin's Message:** \`${reasonText}\``);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Server Admin"
};

exports.help = {
  name: "warn",
  description: "Warn a user, and send a direct message to them containing a message.",
  usage: "warn [@mention] <messageToSend>"
};