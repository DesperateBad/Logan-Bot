const config = {

  "botName": "Logan",
  "botDescription": "Logan brings fun and happiness to servers everywhere!",

  // The following can not be changed by users:
  "ownerID": "428783792275193868",

  "prefix": "?",

  "admins": [],
  "support": ['242638287712288768', '412518473420505089'],

  "inviteLink": "https://discordapp.com/oauth2/authorize?client_id=470864521842655252&scope=bot",
  "version": "0.2.0",

  "callbackURL": "https://logan-bot.glitch.me/callback",

  "domain": "https://logan-bot.glitch.me",
  
  
  "dashboardTabs": [
      {
        name: "Bot Settings",
      },
      {
        name: "Commands",
        dropdown: [
          "Info",
          "Miscellaneous",
          "Memes",
          "Moderation",
          "Utility",
          "Animals",
          "Fun",
          "Administration"
        ]
      },
      "divider",
      {
        name: "Events",
      },
      {
        name: "Automod",
      },
      {
        name: "Logging",
      }
  ],

  // Default server config
  "defaultConfig": {
    "prefix": "?",
    "disabledCommands": [],
    
    "channelCreate": {
      "enabled": false,
      "announcementChannel": "general",
      "announcementMessage": "A new channel, {{channel}}, has just been created"
    },
    "guildMemberAdd": {
      "enabled": true,
      "announcementChannel": "announcements",
      "announcementMessage": "Everyone give a warm welcome to {{member}}!"
    },
    "guildMemberRemove": {
      "enabled": false,
      "announcementChannel": "announcements",
      "announcementMessage": "Say your goodbyes to {{member}} ._."
    },
    "guildBanAdd": {
      "enabled": false,
      "announcementChannel": "announcements",
      "announcementMessage": "Oof! {{member was just banned from the server!"
    },
    "guildBanRemove": {
      "enabled": false,
      "announcementChannel": "announcements",
      "announcementMessage": "Welcome back to the server{{member}}! ^-^"
    },
    "logging": {
      
      "loggingChannel": "logs",
      
      "guildMemberAdd": "true",
      "guildMemberRemove": "true",
      
      "guildBanAdd": "true",
      "guildBanRemove": "false",
      
      "messageDelete": "false",
      
    },
    "autoMod": {
      
      "massEmoji": {
        "enabled": "true",
        "whitelist": []
      },
      
      "massMentions": {
        "enabled": "true"
      },
      
      "messageSpam": {
        "enabled": "true",
      },
      
      "swearing": {
        "enabled": "false",
        "swearWords": ['fuck', 'shit', 'cunt', 'faggot', 'bitch']
      },
    }
  },


  permLevels: [

    // This is the lowest permisison level, this is for non-roled users.
    {
      level: 1,
      name: "Open",
      check: () => true
    },

    {
      level: 2,
      name: "Server Admin",
      check: (message) => {
        try {
          // const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.serverConfig.adminRole.toLowerCase());
          return (message.member.permissions.has("MANAGE_GUILD"));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    {
      level: 3,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    {
      level: 4,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    {
      level: 5,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    // Bot's owner. Only the Bot's owner should have this as it gives access to potentially
    // dangerous commands such as ?eval
    {
      level: 6,
      name: "Bot Owner",
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}

module.exports = config;
