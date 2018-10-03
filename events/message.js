module.exports = async (client, message) => {
  
  // if (message.content.startsWith("?jukebox")) return message.channel.send(`The \`${client.config.prefix}jukebox\` command has changed to \`${client.config.prefix}jb\`.\nUse \`${client.config.prefix}jb help for a list of commands.`);
  // if (message.content.startsWith("?jb")) return;
  
  // Ignore all bots
  if (message.author.bot) return;
  
  // Get the guild's settings
  const serverConfig = message.serverConfig = client.serverConfig.ensure(message.guild.id, client.config.defaultConfig);
  // const serverWarns = message.serverWarns = client.serverWarns.ensure(message.guild.id, client.config.defaultWarns);
  let slotwin;
  
  slotwin = client.getWins.get(message.author.id, message.guild.id);
    if (!slotwin) {
      slotwin = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, wins: 0 }
    }
  
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  
  // Our standard argument/command name definition
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Get the users perms
  const level = client.permLevel(message)
  
  // If the message is just "?", ignore it
  if (!command) return;
  const isOnlyPrefix = /^[?]+$/.test(command);
  if (isOnlyPrefix == true) return;
  
  // Grab the command or alias data from the client.commands Enmap
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    
  // If that command doesn't exist send message
  if (!cmd) {
    if (serverConfig.unknownCommandNotice == "true") {
      return message.channel.send("I-I don't recognise that command!");
    } else {
      return;
    }
  }

  // Get the command's requires perm level, and check if the user has that perm level
  if (level < client.levelCache[cmd.conf.permLevel]) {
       return message.channel.send( { embed: { title: `You're not allowed to run that command!`, color: 0xf29837, description: `Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}),\nand you need to have level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})to use this command ;-;`, }, } );
   }

   message.author.permLevel = level;
  
   message.flags = [];
   while (args[0] && args[0][0] === "-") {
     message.flags.push(args.shift().slice(1));
   }
     
  if (client.cooldownProvider.has(message.author.id)) return message.channel.send("That command is currently on cooldown. Please try again later");

var isDisabled = (serverConfig.disabledCommands.indexOf(command) > -1);
  
// If the command exists, **AND** the user has permission, run it
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
  } else message.channel.send("That command has been disabled on this server. Contact the server admins if you wish to use it.");
};