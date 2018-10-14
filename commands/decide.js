exports.run = (client, message, args, level) => {

  const decision = args.join(" ");
  
  const response = [
    'Yes',
    'No',
    'Most likely',
    'Plz no ;-;',
    'Definitely',
    'I think so',
    'Without a doubt',
    'Doubtful',
    'Possibly',
    'NO!! (╯°□°）╯︵ ┻━┻)',
    'No, no, no, no...',
    'The voices are telling me \"yes\"...',
    'Pfffft... no',
    'Oh, YES!'
  ].random();
      
  if (!args) {
    return message.reply("I can't decide on nothing o-o");
  }
  
  message.channel.startTyping();
      
  message.channel.send(".")
   .then(sentMessage => {  
  setTimeout(function() {
    sentMessage.edit("Thinking")
  }, 10)
  setTimeout(function() {
    sentMessage.edit("Thinking.")
  }, 100)
  setTimeout(function() {
    sentMessage.edit("Thinking..")
  }, 500)
  setTimeout(function() {
    sentMessage.edit("Thinking...")
  }, 900)
  setTimeout(function() {
   if (decision.includes(" or ")) {
    var option = decision.split(" or ").random();
     
    sentMessage.edit("**Question:** " + args + "\n**Answer**: " + option)
     
   } else {
     
    sentMessage.edit("**Question:** " + args + "\n**Answer**: " + response)
   };
  }, 1180)
  });
  
  message.channel.stopTyping();
  
 };
  
  exports.conf = {
    enabled: true,
    aliases: ['decision'],
    permLevel: "Open"
  };
  
  exports.help = {
    name: "decide",
    description: "Got trouble deciding? I can help with that ^-^",
    usage: "decide [text]"
  };
