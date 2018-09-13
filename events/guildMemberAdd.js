module.exports = (client, member) => {

  client.serverConfig.ensure(member.guild.id, client.config.defaultConfig);
  
  let announcementCheck = client.serverConfig.get(member.guild.id, "announceNewMembers");
  
  if (announcementCheck !== "true") return;
  
  
  let welcomeMessage = client.serverConfig.get(member.guild.id, "newMemberAnnouncementMessage"); 
  
  // Our welcome message has a bit of a placeholder, let's fix that:
  welcomeMessage = welcomeMessage.replace("{{member}}", member.user.tag)
  
  // we'll send to the welcome channel.
  member.guild.channels
    .find("name", client.serverConfig.get(member.guild.id, "newMemberAnnouncementChannel"))
    .send(welcomeMessage)
    .catch(console.error);
};
