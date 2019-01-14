const config = {

  "botName": "Logan",
  "botDescription": "Logan brings fun and happiness to servers everywhere!",

  "ownerID": "428783792275193868",

  "prefix": "?",

  "admins": [],
  "webAdmins": ['428783792275193868', '292505050436206593'],
  "support": ['242638287712288768', '412518473420505089'],

  "inviteLink": "https://discordapp.com/oauth2/authorize?client_id=470864521842655252&scope=bot",
  "version": "0.2.0",

  "callbackURL": "https://highfox.tk/logan/callback",

  "domain": "https://highfox.tk/logan/",
  
  
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
    
    "events": {
      "announcementChannel": "general",
      "announcements": [
        {
          "event": "channelCreate",
          "announcement": "false",
          "announcementMessage": "A new channel was just created! Go check out {{channel}}"
        },
        {
          "event": "guildMemberAdd",
          "announcement": "true",
          "announcementMessage": "Welcome {{member}}! We hope you enjoy your time here at {{guildName}}"
        },
        {
          "event": "guildMemberRemove",
          "announcement": "false",
          "announcementMessage": "{{member}} just left the server ._."
        },
        {
          "event": "guildBanAdd",
          "announcement": "false",
          "announcementMessage": "Oof! {{member}} was just banned from the server!"
        },
        {
          "event": "guildBanRemove",
          "announcement": "false",
          "announcementMessage": "{{member}} was just unbanned! Welcome back!"
        }
      ]
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
