exports.run = (client, message, args, level) => {
  
   if (!args[0]) {
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level);

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let output = `[Use ${client.config.prefix}help <commandname> for details]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.name > c.help.name ? 1 : -1 );
    sorted.forEach( c => {
       output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}: ${c.help.description}\n`
    });
    message.author.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.author.send(`**${command.help.name}**\n${command.help.description}\nusage: ${command.help.usage}\naliases: ${command.conf.aliases.join(", ")}`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  aliases: ['h'],
  permLevel: "Open"
};

exports.help = {
  name: 'help',
  description: 'Gives you all of my commands :3',
  usage: 'help [command]'
};
