module.exports = (client, message, member) => { 
  
  if (client.config.welcomeNewMembers == "false") return;
  
  const welcomeMessages = [
    `Everybody our new member ${member} to the server!`,
    `Welcome to the server ${member}!`,
    `Please welcome the one and only ${member}!`,
    `Introduce yourselves to our new member ${member}!`,
    `Greetings ${member}! Welcome to the server!`
  ];
  
    var welcomeMessage = Math.floor(Math.random()*welcomeMessages.length);
        
    const channel = message.guild.channels.find('name', client.config.welcomeChannel);
    
    if (!channel) return console.log("welcomeChannel not found.");
    	channel.send(welcomeMessage);
};
