module.exports = (client, guild, user) => {

  const serverConfig = client.getGuildSettings(guild);
  
  if (serverConfig.announceNewBans !== "true") return;
  
  const banMessage = serverConfig.newBanAnnouncementMessage.replace("{{member}}", user.tag);
  
  user.guild.channels.find("name", serverConfig.newBanAnnouncementChannel).send(banMessage).catch(console.error);
};
