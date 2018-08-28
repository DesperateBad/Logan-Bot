module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;
  
  // Get the guild's settings
  const guildConf = message.serverConf = client.getGuildSettings(message.guild);
  
  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;
  
  // Our standard argument/command name definition
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // If the message is just "?", ignore it
  if (!command) return;
  
  // Grab the command or alias data from the client.commands Collection
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  // If that command doesn't exist send message
  if (!cmd) return message.channel.send("I-I don't recognise that command!");

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
   cmd.run(client, message, args, level);
 };
