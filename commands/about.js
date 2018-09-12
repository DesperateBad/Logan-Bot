exports.run = (client, message, level) => {
  
  const fs = require("fs");
  const commandList = fs.readdir("./");
  
  message.channel.send({embed: {
    color: 0xf29837,
    title: `${client.config.botName} | Release ${client.config.version}`,
    description: "Info about me! ^-^",
    fields: [{
        name: "Developer:",
        value: "High-Fox",
        inline: true
      },
      {
        name: "Library:",
        value: "Discord.js",
        inline: true
      },
      {
        name: "Commands:",
        value: `${commandList.length}`,
        inline: true
      },
      {
        name: "Discord Server:",
        value: "[Invite Link](https://discordapp.com/invite/dsrRtwZ)",
        inline: true
      }
    ],
    thumbnail: {
      url: client.user.avatarURL
    },
    footer: {
      avatar_url: "http://hamtaro-api.herokuapp.com/assets/images/profile_hd.jpg",
      text: `${client.config.botName} © High-Fox 2018`
    }
   }
 })
};

exports.conf = {
  enabled: true,
  aliases: ['info', 'inf'],
  permLevel: "Open"
};

exports.help = {
  name: "about",
  description: "Info about me :D",
  usage: "about"
};
