const serverConfig = client.serverConfig.ensure(message.guild.id, client.defaultConfig);

const config = {
  
  "botName": "Logan",
  
  // The following can not be changed by users:
  "ownerID": "428783792275193868",
  
  "prefix": "?",
  
  "admins": [],
  "support": ['242638287712288768'],
  
  "inviteLink": "https://discordapp.com/oauth2/authorize?client_id=470864521842655252&scope=bot",
  "version": "0.0.0",
  
  
  // Default server config
  "defaultConfig" : {
    
    "adminRole": "Administrators",
    
    "unknownCommandNotice": "true",
    "disabledCommandNotice": "true",
    
    "announceNewTextChannels": "true",
    "newTextChannelAnnouncementChannel": "general",
    "newTextChannelAnnouncement": "The text channel {{channel}} was just created!",
    
    "announceNewVoiceChannels": "true",
    "newVoiceChannelAnnouncementChannel": "general",
    "newVoiceChannelAnnouncement": "The voice channel {{channel}} was just created!",
    
    "announceNewMembers": "true",
    "newMemberAnnouncementChannel": "general",
    "newMemberAnnouncementMessage": "Welcome to the server {{member}}!",
    
    "announceNewBans": "true",
    "newBanAnnouncementChannel": "general",
    "newBanAnnouncementMessage": "{{member}} was just banned from the server!"
    
  },
  
    permLevels: [
      
    // This is the lowest permisison level, this is for non-roled users.
    { level: 1,
      name: "Open", 
      check: () => true
    },

    { level: 2,
      name: "Server Admin", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === serverConfig.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    { level: 3,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 4,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 5,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    
    // Bot's owner. Only the Bot's owner should have this as it gives access to potentially
    // dangerous commands such as ?eval
    { level: 6,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
};

module.exports = config;
