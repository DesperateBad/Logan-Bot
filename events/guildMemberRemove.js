module.exports = (client, member) => {
  
  const serverConfig = client.getGuildSettings(member.guild);
  
  const message = (`${member.toString} just left the server ._.`);
  let channel = member.guild.channels.find("name", serverConfig.kickAnnouncementChannel);
  
  if (!channel) return member.guild.channels.find("name", serverConfig.fallbackChannel).send(message).catch(console.error);
  else return channel.send(message).catch(console.error);
  
  
}
