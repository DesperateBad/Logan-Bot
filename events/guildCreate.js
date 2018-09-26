module.exports = (client, guild) => {
  
const defaultChannel = client.getDefaultChannel(guild);
const config = client.getGuildSettings(guild);
  
defaultChannel.send(`Thanks for inviting me to your server! H-Here's some info about me, if you're interested. ◕ ◡ ◕`, {
  embed:{
      author: {
        name: client.user.username,
      },
      color: client.config.defaultConfig.embedColour, 
      thumbnail: {
        url: client.user.avatarURL,
      },
      description: "Use ?help to see my commands! ^-^",
      fields: [
          {
              name: '**My Creator:**',
              value: '[High-Fox](https://github.com/High-Fox/)',
              inline: true
          },     
          /* {
              name: 'Join my server:',
              value: 'https://discord.gg/dsrRtwZ',
              inline: true
          } */
      ],
      footer: {
          text: `${client.config.botName} © High-Fox 2018`
      }
    }
  })
};
