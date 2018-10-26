const Long = require("long");

module.exports = (client) => {
  
  client.permLevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };
  
  client.changeNickname = (guild, data) => {
    guild.me.setNickname(data.nickname);
  };
  
  client.getGuildSettings = (guild) => {
    const def = client.config.defaultConfig;
    if (!guild) return def;
    const returns = {};
    const overrides = client.serverConfig.get(guild.id) || {};
    for (const key in def) {
      returns[key] = overrides[key] || def[key];
    }
    return returns;
  };
  
  client.awaitReply = async (msg, question, limit = 20000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };
  
  client.writeSettings = (id, newSettings) => {
    const defaults = client.config.defaultConfig;
    let settings = client.serverConfig.get(id);
    if (typeof settings != "object") settings = {};
    for (const key in newSettings) {
      if (defaults[key] !== newSettings[key]) {
        settings[key] = newSettings[key];
      } else {
        delete settings[key];
      }
    }
    var values = Object.values(settings);
    var place = 0;
    Object.keys(settings).forEach(item => {
      client.serverConfig.setProp(id, item, values[place]) 
      place++;
    })
  };
  
  client.updateGuildCmd = (id, commandData) => {
    let conf = client.serverConfig.get(id);
    // if (conf.disabledCommands.indexOf(commandData.command) < 0)) return;
  };
  
  client.loadCommand = (commandName) => {
    try {
      const props = require(`../../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (err) {
      return `Unable to load command ${commandName}: ${err}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../../commands/${commandName}`)];
    delete require.cache[require.resolve(`../../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };
  
  client.getNumbersBetween = async (x, y) => {
    var numbers = [];
    for (var i = x; i < y; i++) {
      numbers.push(i);
    }
    numbers.push(y);
    
    return numbers;
  }

client.getDefaultChannel = async (guild) => {
    guild.channels.forEach((channel) => {
      if(channel.type == "text") {
        if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
          return channel;
        }
      }
    })
  };
  
client.cooldownHandler = (time, oncdmsg, message) => {
  if (!client.cooldownProvider.has(message.author.id)) {
    if (message.author.id == client.config.ownerID) return;
    // if (message.author.id == '412518473420505089') return;
    
      client.cooldownProvider.set(message.author.id, oncdmsg);
    
      setTimeout(function() {
        client.cooldownProvider.delete(message.author.id);
      }, time)
   }
};

client.getCurrentDate = () => {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var n = `${day}/${month}/${year}`;
    return n;
};
  
client.muteHandler = (message, time) => {
  let muted = message.guild.roles.find(r => r.name === "Muted");
  if (!muted) {
    message.guild.createRole({
      name: "Muted"
    });
    muted = message.guild.roles.find(r => r.name === "Muted");
  };
  message.mentions.members.first().addRole(muted.id).catch((err) => { console.log(err); message.channel.send("There was an error muting the user ;-;") });
  setTimeout(function() {
    message.mentions.members.first().removeRole(muted.id);
  }, time)
};
  
String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}; 
  
Array.prototype.random = function() {
  let rand = Math.floor(Math.random() * this.length);
  return this[rand];
}
  
client.wait = require("util").promisify(setTimeout);
  
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
});
  
};
