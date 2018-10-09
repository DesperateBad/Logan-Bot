module.exports = (client, guild, user) => {

  const serverConfig = client.getGuildSettings(guild);

  if (serverConfig.announceBans !== "true") return;

  const banMessage = serverConfig.banAnnouncementMessage.replace("{{member}}", user.tag);

  user.guild.channels.find("name", serverConfig.banAnnouncementChannel).send(banMessage).catch(console.error);
};
