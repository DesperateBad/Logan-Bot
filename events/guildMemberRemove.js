module.exports = (client, member) => {
  
  try {
  const serverConfig = client.getGuildSettings(member.guild);
  
  const message = `**${member.user.tag}** just left the server ._.`;
  let channel = member.guild.channels.find(channel => channel.name === serverConfig.kickAnnouncementChannel);
  
  if (!channel) {
    return member.guild.channels.find(channel => channel.name === serverConfig.fallbackChannel).send(message);
  } else {
    return channel.send(message);
  }
  
  } catch (err) {
    return;
  }
  
};