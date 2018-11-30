module.exports = async (client, guild) => {

  if (client.serverConfig.has(guild.id)) {
    client.serverConfig.delete(guild.id);
  }
};
