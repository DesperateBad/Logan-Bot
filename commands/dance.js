exports.run = (client, message, args, level) => {
  
  const dances = [
    
    "https://cdn.discordapp.com/attachments/469687019631542272/496115649744076801/image0.gif",
    "https://media.giphy.com/media/oTiMS5tKgDSKY/giphy.gif",
    "https://media.tenor.com/images/0be4033d4b361127f4990add85864c5e/tenor.gif",
    "https://steamusercontent-a.akamaihd.net/ugc/913539566577480542/84B64D2E1C133CA98739DF10D7A55F203F92D5A6/",
    "https://i.gifer.com/7BN.gif",
    "https://img.fireden.net/a/image/1472/69/1472691290793.gif",
    "https://thumbs.gfycat.com/SparklingPointlessFinch-small.gif"
  ];
  
  const randomDance = Math.floor(Math.random() * dances.length);
  
  message.channel.send( { embed: { color: 0xCFD9F9, image: { url: dances[randomDance] } } } );

};

exports.conf = {
  enabled: true,
  aliases: ['dancing'],
  permLevel: "Open"
};
  
exports.help = {
  name: "dance",
  description: "Dance party!",
  usage: "dance"
};