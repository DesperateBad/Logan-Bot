exports.run = (client, message, args, level) => {

  if (!args[0]) {
    const commands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && !cmd.conf.hidden && cmd.conf.enabled !== false);

    const commandNames = commands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let output = `[Use ${client.config.prefix}help <commandname> for details]\n`;
    const sorted = commands.array().sort((p, c) => p.help.name > c.help.name ? 1 : -1);
    sorted.forEach(c => {
      output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)}: ${c.help.description}\n`
    });
    message.author.send(output, { code: "asciidoc", split: { char: "\u200b" } });
  } else {
    let command = args[0];
    if (client.commands.has(command) || client.commands.has(client.aliases.get(command))) {
      let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
      let aliases = [];
      cmd.conf.aliases.forEach((alias) => {
        aliases.push(`${message.serverConfig.hasOwnProperty('prefix') ? message.serverConfig.prefix : client.config.prefix}${alias}`);
      });
      if (level < client.levelCache[cmd.conf.permLevel]) return;
      message.channel.send({ embed: { color: 0xCFD9F9, title: `Info for command: **${cmd.help.name}**`, description: `${cmd.help.description}`, fields: [{ name: '**Usage**', value: `${message.serverConfig.hasOwnProperty('prefix') ? message.serverConfig.prefix : client.config.prefix}${cmd.help.usage}`, inline: true}, { name: '**Aliases:**', value: `${aliases.length > 0 ? aliases.join(', ') : 'None'}`, inline: true }]}});
    } else return;
  }
};

exports.conf = {
  enabled: true,
  aliases: ['h'],
  permLevel: "Open"
};

exports.help = {
  category: "Info",
  name: 'help',
  description: 'Gives you all of my commands :3',
  usage: 'help <command>'
};
