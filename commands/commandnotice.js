exports.run = (client, message, args) => {
  
  const commandName = args.join(" ");
  
  const cmd = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName));
  
  // const guildList = client.guilds.array();
  
  // guildList.forEach((client, guild) => {
    
    var announcementCheck = message.serverConfig.announceNewCommands;
    
    if (announcementCheck !== "true") return;
    
    
    let channel = message.serverConfig.newCommandAnnouncementChannel;
    
    channel.send( { embed: { title: "Notice of New Command!", description: "I've just been given a new command! Check it out:", color: 0xf29837, fields: [{ name: "Name", value: `${cmd.help.name}`, inline: true }, { name: "Description", value: `${cmd.help.description}`, inline: true }, { name: "Aliases", value: `${cmd.conf.aliases.join(", ")}`, inline: true }, { name: "Usage", value: `${cmd.help.usage}`, inline: true } ] } } );
  // })
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "commandnotice",
  description: "Sends an announcement to every guild the bot has joined, containing info about a new command.",
  usage: "commandnotice [commandName]"
};
  