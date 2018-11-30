module.exports = async (client, channel) => {

  const serverConfig = client.getGuildSettings(channel.guild);

  if (channel.type == "text") {
    if (serverConfig.announceNewTextChannels == "true") {
      const announcementChannel = channel.guild.channels.find(t => t.name === serverConfig.textChannelAnnouncementChannel);
      const message = serverConfig.newTextChannelAnnouncement;
      const announcementMessage = message.replace("{{channel}}", channel.name);

      announcementChannel.send(announcementMessage);
    } else {
      return;
    }
  } else if (channel.type == "voice") {
    if (serverConfig.announceNewVoiceChannels == "true") {
      const announcementChannel = channel.guild.channels.find(v => v.name === serverConfig.voiceChannelAnnouncementChannel);
      const message = serverConfig.newVoiceChannelAnnouncement;
      const announcementMessage = message.replace("{{channel}}", channel.name);

      announcementChannel.send(announcementMessage);
    } else {
      return;
    }
  }
};
