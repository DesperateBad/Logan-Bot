exports.run = (client, message, [member, ...newRole], level) => {
  
  const role = message.guild.roles.find("name", newRole.join(" "));
  const user = message.mentions.members.first();
  
  if (!user) return message.channel.send("Please mention a user to give the role to");
  
  if (!role) return message.channel.send(`The role \'${newRole.join(" ")}\' does not exist on this server.`);
  
  if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
      return message.channel.send("I need permission to manage roles first ;-;");
  }
  
  user.addRole(role.id).catch((err) => {
    console.log(err);
    message.channel.send("There was an error adding the role, sorry");
  })
};

exports.conf = {
  enabled: true,
  aliases: ['addrole'],
  permLevel: "Open"
};

exports.help = {
  name: "giverole",
  description: "Adds a role to a user in the server.",
  usage: "giverole [@mention] [roleName]"
};