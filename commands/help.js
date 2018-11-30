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
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send({ embed: { title: `${client.config.prefix}${command.help.name}`, description: `${command.help.description}`, fields: [{ name: 'Usage:', value: `${command.help.usage}`, inline: true }, { name: 'Aliases:', value: `${command.conf.aliases.join(", ")}`, inline: true }]}});
    }
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
  usage: 'help [command]'
};
