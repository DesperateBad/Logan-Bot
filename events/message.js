const ms = require("ms");
module.exports = async (client, message) => {

  if (message.author.bot) return;
  
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (!command) return;
  const isOnlyPrefix = /^[?]+$/.test(command);
  if (isOnlyPrefix == true) return;

  const serverConfig = message.serverConfig = client.serverConfig.ensure(message.guild.id, client.config.defaultConfig);

  let slotwin;
  slotwin = client.getWins.get(message.author.id, message.guild.id);
  if (!slotwin) {
    slotwin = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, wins: 0 }
  }

  const level = client.permLevel(message)

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  
  if (!client.cooldownProvider.has(message.author.id)) client.cooldownProvider.set(message.author.id, []);

  // Cooldown shit
  if (cmd.conf.hasOwnProperty('cooldown')) {
    if (client.cooldownProvider.get(message.author.id).includes(cmd.help.name)) {
      return message.channel.send("That command is on cooldown!").then((msg) => msg.delete(1500));
    } else {
      const oldArr = client.cooldownProvider.get(message.author.id);
      oldArr.push(cmd.help.name);
      client.cooldownProvider.set(message.author.id, oldArr);
      setTimeout(function() {
        const newArr = client.cooldownProvider.get(message.author.id);
        newArr.splice(newArr.indexOf(cmd.help.name), 1);
        client.cooldownProvider.set(message.author.id, newArr);
      }, cmd.conf.cooldown)
    }
  }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    return message.channel.send({ embed: { title: `You're not allowed to run that command!`, color: 0xf29837, description: `Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}),\nand you need to have level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})to use this command ;-;`, }, });
  }

  message.author.permLevel = level;

  var isDisabled = (serverConfig.disabledCommands.indexOf(command) > -1);

  if (isDisabled !== true) {
    if (cmd.conf.enabled !== true) {
      if (message.author.id == client.config.ownerID) {
        cmd.run(client, message, args, level, slotwin);
      } else if (serverConfig.disabledCommandNotice == "true") {
        message.channel.send("That command has been temporarily disabled, and will be available soon. Sorry for the inconvenience! ^-^");
      } else if (serverConfig.disabledCommandNotice == "false") {
        return;
      }
    } else {
      cmd.run(client, message, args, level, slotwin);
    }
  } else if (serverConfig.adminsOverrideDisabledCommands == "true") {
    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === serverConfig.adminRole.toLowerCase());
    if (message.member.roles.has(adminRole.id)) {
      cmd.run(client, message, args, level, slotwin);
    }
  } else message.channel.send("That command has been disabled on this server.");
};
