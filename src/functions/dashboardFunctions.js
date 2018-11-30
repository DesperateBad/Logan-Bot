module.exports = (client) => {
  
  client.changeEventAnnouncementChannel = (guild, data) => {
    const channel = data.channel;
    const event = data.event;
    client.serverConfig.setProp(guild.id, `${event}.announcementChannel`, channel);
  };
  
  client.changeEventAnnouncementMessage = (guild, data) => {
    const message = data.message;
    const event = data.event;
    client.serverConfig.setProp(guild.id, `${event}.announcementMessage`, message);
  };
  
  client.changeEventStatus = (guild, data) => {
    const status = data.enabled
    const event = data.event;
    client.serverConfig.setProp(guild.id, `${event}.announceEvent`, status);
  };
  
  client.changeNickname = (guild, data) => {
    guild.me.setNickname(data.nickname);
  };
  
  client.changePrefix = (guild, data) => {
    client.serverConfig.setProp(guild.id, 'prefix', data.prefix);
  };
  
  client.updateGuildEvent = (guild, event, bool) => {
    client.serverConfig.setProp(guild.id, event, bool);
  };
  
  client.enableGuildCommand = (guild, data) => {
    let command = data.command;
    let current = client.serverConfig.getProp(guild.id, 'disabledCommands');
    if (current.indexOf(data.command) > -1) return;
    client.serverConfig.pushIn(guild.id, 'disabledCommands', command);
  };
  
  client.disableGuildCommand = (guild, data) => {
    let command = data.command;
    let current = client.serverConfig.getProp(guild.id, 'disabledCommands');
    if (current.indexOf(data.command) < 0) return;
    client.serverConfig.removeFrom(guild.id, 'disabledCommands', command);
  };
  
  client.changeConfProp = (guild, data) => {
    client.serverConfig.setProp(guild.id, data.key, data.value);
  };
  
};