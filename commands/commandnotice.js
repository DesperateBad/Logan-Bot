exports.run = (client, message, args) => {
  
  const commandName = args.join(" ");
  
  const cmd = client.commands.get(commandName) || client.aliases.get(client.commands.get(commandName));
  
  const guildList = client.guilds.array();
  
  const serverConfig = client.getGuildSettings(message.guild);
  
  // guildList.forEach((client, guild) => {
    
    let announcementCheck = serverConfig.announceNewCommands;
    
    if (announcementCheck !== "true") return;
    
    
    let channel = serverConfig.newCommandAnnouncementChannel;
    
    channel.send( { embed: { title: "Notice of New Command!", description: "I've just been given a new command! Check it out:", color: 0xf29837, fields: [{ name: "Name", value: `${cmd.help.name}`, inline: true }, { name: "Description", value: `${cmd.help.description}`, inline: true }, { name: "Aliases", value: `${cmd.conf.aliases.join(", ")}`, inline: true }, { name: "Usage", value: `${cmd.help.usage}`, inline: true } ] } } );
  // })
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "commandnotice",
  description: "Sends an announcement to every guild that the bot is in containing info about a command.",
  usage: "commandnotice [commandName]"
};
  