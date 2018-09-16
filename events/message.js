module.exports = async (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  
  // Get the guild's settings
  const serverConfig = message.serverConfig = client.serverConfig.ensure(message.guild.id, client.config.defaultConfig);
  
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

   // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
   // The "level" command module argument will be deprecated in the future
   message.author.permLevel = level;
  
   message.flags = [];
   while (args[0] && args[0][0] === "-") {
     message.flags.push(args.shift().slice(1));
   }
   // If the command exists, **AND** the user has permission, run it
   if (cmd.conf.enabled !== true) {
     if (message.author.id == client.config.ownerID) {
        cmd.run(client, message, args, level);
     } else if (serverConfig.disabledCommandNotice == "true") {
     message.channel.send("That command has been temporarily disabled, and will be available soon. Sorry for the inconvenience! ^-^");
     } else if (serverConfig.disabledCommandNotice == "false") {
       return;
     }
   } else {
     cmd.run(client, message, args, level);
   }
 };
