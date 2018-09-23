# Logan-Bot 
An adorable little bot for you Discord Server! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
> #### Invite me [here!](https://discordapp.com/oauth2/authorize?client_id=470864521842655252&scope=bot)

---

##### Submit issues and bugs [here.](https://github.com/High-Fox/Logan-Bot/issues)
###### Created by [High-Fox](https://github.com/High-Fox/)

---

## Contents:
* [Setup Instructions](#setup-instructions)
* [Config List](#config-list)
* [Features](#features)

---

### Setup Instructions:
1. Invite the bot to your server.
2. Make sure the bot has permission to send messages in **at least one** text channel.
3. Use the command `?conf edit adminRole <role name>`, replacing `<role name>` with the name of a role that has administrator permissions. (This will be the role that can use the `?conf` command)

**You're all set to use Logan Bot! Use ?help to view commands that your permission level can use!**

---

### Config List:
These are the key names for the `?conf` command. 
> **(Key names are case sensitive)**
To change a key: `?conf edit <keyName> <newValue>`
To view a key's value: `?conf view <keyName>`
To reset a key's value to its default value: `?conf reset <keyName>`

| Key | Type | Description | Default Value |
|:---:|:---:|:---:|:---:|
| `adminRole` | string | Defines the role on the server that has administrative permissions. | Admins |
| `embedColour` | [ColourResolvable](https://discord.js.org/#/docs/main/stable/typedef/ColorResolvable) | Valid ColourResolvable that will be used as the colour in embeds. | 'ORANGE' |
| `disabledCommands | array | Array of disabled commands. | ['ping'] |
| `adminsOverrideDisabledCommands` | boolean | Whether or not members with the `adminRole` can override and run disabled commands. | false |
| `unknownCommandNotice` | boolean | Whether to respond with "Unknown command" when a user runs a command that doesn't exist. | true |
| `fallbackChannel` | string | Default text channel to fallback to if a channel from one of the config keys is not found, or if an error occurs. | general |
| `enableJukebox` | boolean | Whether the Jukebox component is useable or not. | true |
| `welcomeMembers` | boolean | Whether or not Logan should send a welcome message when a new member joins the server. | true |
| `welcomeMessage` | string | Message to send when a member joins the server. If the message contains `{{member}}`, it will be replaced with the name of the member that joined.  | Welcome to the server {{member}}! |
| `welcomeChannel` | string | Name of the channel that welcome messages will be sent to, if `welcomeMembers` is true. (Logan must have permission to send messages to the channel) | welcome-channel |
| `announceNewTextChannels` | boolean | Whether or not to send a message when a new text channel is created. | false |
| `newTextChannelAnnouncement` | string | Message to send when a new text channel is created. If the message contains `{{channel}}`, it will be replaced with the name of the new text channel. | A new text channel, {{channel}}, was just created! |
| `textChannelAnnouncementChannel` | string | Name of the channel that new text channel announcements will be sent to. (Logan must have permission to send messages to the channel) | announcements |
| `announceNewVoiceChannels` | boolean | Whether or not to send a message when a new voice channel is created. | false |
| `newVoiceChannelAnnouncement` | string | Message to send when a new voice channel is created. If the message contains `{{channel}}`, it will be replaced with the name of the new voice channel. | A new voice channel, {{channel}}, was just created! |
| `newVoiceChannelAnnouncementChannel` | string | Name of the channel that new voice channel announcements will be sent to. (Logan must have permission to send messages to the channel) | announcements |
| `announceBans` | boolean | Whether or not to send a message when a user is banned from the server. | true |
| `banMessage` | string | Message to send when a user is banned. {{member}} will be replaced with the banned users' name. | Oof! {{member}} was just banned! |
| `banAnnouncementChannel` | string | Name of the channel that ban announcements will be sent to. (Logan must have permission to send messages to the channel) | announcements |
| `announceKicks` | boolean | Whether or not to send a message when a user is kicked from the server. | false |
| `kickMessage` | string | Message to send when a user is kicked. {{member}} will be replaced with the kicked users' name. | {{member}} was just kicked! |
| `kickAnnouncementChannel` | string | Name of the channel that kick announcements will be sent to. (Logan must have permission to send messages to the channel) | announcements |
---

#### Features:
* Adorable random image commands to lighten up the mood and make you go *awwwww!* ヽ(^◇^*)/
* A decision maker to help settle an argument or a hard choice to be made.
* Create your own memes for laughs!
* Action commands such as ?hug and ?kiss
* Customizable settings to make your Logan unique to your server!
  
