exports.run = (client, message, level) => {
  
const bearJokes = [
  "What do you call a bear that jumps but never lands?\n**A Peter Panda!**",
  "How do you catch a fish without your fishing rod?\nWith your **BEAR** hands!",
  "What do you call a bear with no teeth?\nA **Gummy Bear!**",
  "What did the teddy bear say after dinner?\nI'm **stuffed!**",
  "I'm sorry I make bad jokes, please **BEAR** with me for a second."
];
  
  var randomBearJoke = Math.floor(Math.random() * bearJokes.length); 
    
  message.channel.send( { embed: { title: bearJokes[randomBearJoke], color: 0xf29837, image: { url: client.getRandomImage("bear"), }, } } );
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: "growl",
  description: "Growl Growl! ʕ•ᴥ•ʔ",
  usage: "growl"
};
