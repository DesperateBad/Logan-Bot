const ms = require("ms");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  /* 
  -- Create poll --
  Input Example: ?poll create title:(Which are better, cats or dogs?) options:(Cats,Dogs) emotes:(:cat:,:dog:)
  NOTE: On creation of poll, creator is dm'd its Discord ID. ID is required to edit the poll, unless you are of higher perms.
  ALSO NOTE: Timelimit property is optional as the poll will be given default timelimit of 1h.
  !!! NOTE THIS TOO: The options property MUST be relative to the emojis property !!!
  -- Edit poll --
  Input Example: ?poll edit id:(123456789) title:(Which are better, hamsters or rabbits?) options:(Hamsters,Rabbits) emotes:(:hamster:,:rabbit:)
  */

  async function getProps(action) {
    const inp = args.join(" ");
    
    // Get the first bracket before each of the property definitions
    let FIRSTbrtitleloc = inp.indexOf("title:(") + 7;
    let FIRSTbroptionsloc = inp.indexOf("options:(" + 9);
    let FIRSTbremotesloc = inp.indexOf("emotes:(" + 8)

    let FIRSTbrtimeloc;
    if (inp.indexOf("timelimit:(") > -1) FIRSTbrtimeloc = inp.indexOf("timelimit:(") + 11;

    // Get everything after the first brackets defined above ^
    let AFTERfirsttitlebr = inp.substr(FIRSTbrtitleloc);
    let AFTERfirstoptionsbr = inp.substr(FIRSTbroptionsloc);
    let AFTERfirstemotesbr = inp.substr(FIRSTbremotesloc);

    let AFTERfirsttimebr;
    if (FIRSTbrtimeloc) AFTERfirsttimebr = inp.substr(FIRSTbrtimeloc);

    // Get the second bracket after each of the property definitions
    let SECONDbrtitleloc = AFTERfirsttitlebr.indexOf(")");
    let SECONDbroptionsloc = AFTERfirstoptionsbr.indexOf(")");
    let SECONDbremotesloc = AFTERfirstemotesbr.indexOf(")");

    let SECONDbrtimeloc;
    if (FIRSTbrtimeloc) SECONDbrtimeloc = AFTERfirsttimebr.indexOf(")");

    // And FINALLY get the actual property definitions (Took long enough, ay?)
    let title = inp.substr(FIRSTbrtitleloc, SECONDbrtitleloc);
    let optionsarr = inp.substr(FIRSTbroptionsloc, SECONDbroptionsloc);
    let options = optionsarr.split(","); // Array
    let optionemotesarr = inp.substr(FIRSTbremotesloc, SECONDbremotesloc);
    let optionemotes = optionemotesarr.split(","); // Array

    let timelimit;
    if (FIRSTbrtimeloc) timelimit = inp.substr(FIRSTbrtimeloc, SECONDbrtimeloc)
    else timelimit = "1h";
    
    console.log(title);
    console.log(options);
    console.log(optionemotes);
    console.log(timelimit);
    
    if (action === "edit") {
      let FIRSTbridloc = inp.indexOf("id:(") + 4;
      let AFTERfirstidbr = inp.substr(FIRSTbridloc);
      let SECONDbridloc = AFTERfirstidbr.indexOf(")");
      let id = inp.substr(FIRSTbridloc, SECONDbridloc);
      
      return [id, title, options, optionemotes, timelimit];
    } else return [title, options, optionemotes, timelimit];
  }
  
  async function createPoll(input) {
    const props = getProps("create", input);
    var title = props[0];
    var options = props[1];
    let optionemotes = props[2];
    var optionsamount = client.getNumbersBetween(0, options.length);
    var timelimit = props[3];

    console.log(title);
    console.log(options/*.join(",")*/);
    console.log(optionemotes/*.join(",")*/);
    console.log(optionsamount/*.join(",")*/);
    console.log(timelimit);
    
    let currentemote = 0;

    const pollembed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`${message.author.username} has made a poll \`${title}\``)
      .setColor(0xCFD9F9);

    let reactinfo = "\nReact to this message to cast a vote!\n"
    
    optionemotes.forEach(element => {
      pollembed.addField(`${element.toString()} for ${options[currentemote]}\n`, '\u200b');
      currentemote++;
    }).catch(console.error)

    const pollended = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(`**Time's up!** The poll \`${title}\` has expired, let's check out the results!`)
      .setColor(0xCFD9F9);

    message.channel.send( {pollembed} )
      .then((msg) => { 
      var pollID = msg.id;
      message.author.send(`Your poll's unique ID is \`${pollID}\`\nUse it to edit your poll if you need to.`);
      
      optionemotes.array.forEach(element => {
        message.react(element.toString());
      }).catch(console.error)
      const filter = (reaction, emoji) => optionemotes.indexOf(reaction.emoji.name) > -1 === true;

    msg.awaitReactions(filter, { time: ms(timelimit) })
      .then(collected => {
        msg.reactions.array.forEach(reaction => {
          pollended.addField(`${reaction}`, "hi")
        }).catch(console.error)
        msg.channel.send( {pollended} )
      })
  }).catch(console.error);
 }
  
  const action = args.shift();
  if (action === "create") await createPoll.apply(args)
  // else if (action === "edit") await editPoll(args);
  
  console.log(args);
  
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: 'poll',
  description: 'Create or edit a poll that uses reactions as votes!',
  usage: 'poll create title:(poll title here) options:(names,of,poll,options,seperated,by,commas) emotes:(emotes,for,poll,options,seperated,by,commas) timelimit:(time the poll should be open for. defaults to 1h if not given)'
};