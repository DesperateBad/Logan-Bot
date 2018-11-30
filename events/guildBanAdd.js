module.exports = (client, guild, user) => {

  const serverConfig = client.getGuildSettings(guild);

  if (serverConfig.announceBans !== "true") return;

  const banMessage = serverConfig.banAnnouncementMessage.replace("{{member}}", user.tag);

  guild.channels.find(c => c.name === serverConfig.banAnnouncementChannel).send(banMessage).catch(console.error);
};
