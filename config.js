const config = {
  
  // The following can not be changed by users:
  "ownerID": "428783792275193868",
  
  "admins": [],
  "support": [],
  
  "inviteLink": "https://discordapp.com/oauth2/authorize?client_id=470864521842655252&scope=bot",
  "version": "0.0.0 [In-Development]",
  
  
  // Default server config
  "defaultConfig" : {
    
    "prefix": "?",
    "modRole": "Mod",
    "adminRole": "Admin",
    
    "announceNewTextChannels": "true",
    "newTextChannelAnnouncementChannel": "general",
    "newTextChannelAnnouncement": "The text channel {{channel}} was just created!",
    
    "announceNewVoiceChannels": "true",
    "newVoiceChannelAnnouncementChannel": "general",
    "newTextChannelAnnouncement": "The voice channel {{channel}} was just created!",
    
    "announceNewMembers": "true",
    "newMemberAnnouncementChannel": "general",
    "newTextChannelAnnouncement": "Welcome to the server {{member}}!",
    
    "aboutEmbedColour": "0xf29837",
    "growlEmbedColour": "0xf29837",
    "hootEmbedColour": "0xf29837",
    "squeakEmbedColour": "0xf29837",
    "serverInfoEmbedColour": "0xf29837",
    "userInfoEmbedColour": "0xf29837"
  },
  
    permLevels: [
      
    // This is the lowest permisison level, this is for non-roled users.
    { level: 0,
      name: "User", 
      check: () => true
    },

    // This is your permission level, the staff levels should always be above the rest of the roles.
    { level: 2,
      // This is the name of the role.
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    // This is the server owner.
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },
    
    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}