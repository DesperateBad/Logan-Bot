exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };
  
  try {
    const evaled = eval(args);
    const clean = await client.clean(client, evaled);
    
  } catch (err) {
    console.log("Error executing ?eval command");
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "eval",
  description: "Executes arbitrary javascript. Only usable by the Bot Owner, for safety reasons.",
  usage: "eval [...code]"
};
