module.exports = (client, member) => {

  client.serverConfig.ensure(member.guild.id, client.config.defaultConfig);

  function getChannel(guild) {
    guild.channels.forEach((channel) => {
      if (channel.type == "text") {
        if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          return channel;
        }
      }
    })
  };

  var serverConfig = client.getGuildSettings(member.guild);

  if (serverConfig.welcomeMembers !== "true") return;

  // Our welcome message has a bit of a placeholder, let's fix that:
  var welcomeMessage = serverConfig.welcomeMessage.replace("{{member}}", member.user.toString())

  // we'll send to the welcome channel.
  var channel = member.guild.channels.find("name", serverConfig.welcomeChannel);

  if (channel) {
    channel.send(welcomeMessage);
  } else if (!channel) {
    var theChannel = getChannel(member.guild);
    theChannel.send(welcomeMessage);
  }
};