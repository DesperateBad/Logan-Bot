exports.run = (client, message, [member, ...serverRole], level) => {

  const role = message.guild.roles.find("name", serverRole.join(" "));
  const user = message.mentions.members.first();

  if (!user) return message.channel.send("Please mention a user to remove the role from.");

  if (!role) return message.channel.send(`The role \`${serverRole.join(" ")}\` does not exist on this server.`);

  if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
    return message.channel.send("I need permission to manage roles first ;-;");
  }

  if (user.roles.has(role.id)) {
    user.removeRole(role.id).catch((err) => {
      console.log(err);
      message.channel.send("There was an error removing the role, sorry ._.");
    })
  } else return message.channel.send("That user doesn\'t even have that role... -_-");
};

exports.conf = {
  enabled: true,
  aliases: ['deleterole', 'delrole'],
  permLevel: "Open"
};

exports.help = {
  name: "removerole",
  description: "Removes a role from a user.",
  usage: "removerole [@mention] [roleName]"
};