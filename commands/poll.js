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

  const action = args.shift();

  if (action === "create") await createPoll(args)
  else if (action === "edit") await editPoll(args);

  async function getProps(action, props) {
    const inp = props.join(" ");
    
    // Get the first bracket before each of the property definitions
    let FIRSTbrtitleloc = inp.indexOf("title:(") + 7;
    let FIRSTbroptionsloc = inp.indexOf("options:(" + 9);
    let FIRSTbremotesloc = inp.indexOf("emotes:(" + 8)

    let FIRSTbrtimeloc;
    if (inp.indexOf("timelimit:(") > -1) FIRSTbrtimeloc = inp.indexOf("timelimit:(");

    // Get everything after the first brackets defined above ^
    let AFTERfirsttitlebr = inp.substr(FIRSTbrtitleloc);
    let AFTERfirstoptionsbr = inp.substr(FIRSTbroptionsloc);
    let AFTERfirstemotesbr = inp.substr(FIRSTbremotesloc);

    let AFTERfirsttimebr;
    if (frstbrtimeloc) AFTERfirsttimebr = inp.substr(FIRSTbrtimeloc + 1);

    // Get the second bracket after each of the property definitions
    let SECONDbrtitleloc = AFTERfirsttitlebr.indexOf(")");
    let SECONDbroptionsloc = AFTERfirstoptionsbr.indexOf(")");
    let SECONDbremotesloc = AFTERfirstemotesbr.indexOf(")");

    let SECONDbrtimeloc;
    if (FIRSTbrtimeloc) SECONDbrtimeloc = AFTERfirsttimebr.indexOf(")");

    // And FINALLY get the actual property definitions (Took long enough, ay?)

    let title = inp.substr(FIRSTbrtitleloc, SECONDbrtitleloc);
    let options = inp.substr(FIRSTbroptionsloc, SECONDbroptionsloc).split(","); // Array
    let optionemotes = inp.substr(FIRSTbremotesloc, SECONDbremotesloc).split(","); // Array

    let timelimit;
    if (FIRSTbrtimeloc) timelimit = inp.substr(FIRSTbrtimeloc, SECONDbrtimeloc)
    else timelimit = "1h";

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
    let optionemotes = props[2]
    var optionsamount = await client.getNumbersBetween(0, options.length)
    var timelimit = props[3];

    let pollID;

    let currentemote = 0;

    const pollembed = new Discord.richEmbed()
      .setAuthor(message.author.user.username, message.author.user.avatarURL)
      .setDescription(`${message.author.user.username} has made a poll \`${title}\``)
      .setColor(0xCFD9F9);

    let reactinfo = "\nReact to this message to cast a vote!\n"
    optionemotes.array.forEach(element => {
      pollembed.addField(`${element.toString()} for ${options[currentemote]}\n`,)
      currentemote++;
    })

    const pollended = new Discord.richEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(`**Time's up!** The poll \`${title}\` has expired, let's check out the results!`)
      .setColor(0xCFD9F9);

    message.channel.send({pollembed})
      .then((msg) => { pollID = msg.id
    optionemotes.array.forEach(element => {
      message.react(element.toString());
    })
    const filter = (reaction, emoji) => (optionemotes.indexOf(reaction.emoji.name) > -1) === true;

    msg.awaitReactions(filter, { time: ms(timelimit) })
      .then(collected => msg.channel.send({pollended})
  });

  message.author.send(`Your poll's unique ID is \`${pollID}\`\nUse it to edit your poll if you need to.`);
    
  }
  
};

exports.conf = {
  enabled: false,
  aliases: [],
  permLevel: "Open"
};

exports.help = {
  name: 'poll',
  description: 'Create or edit a poll that uses reactions as votes!',
  usage: 'poll create title:(poll title here) options:(names,of,poll,options,seperated,by,commas) emotes:(emotes,for,poll,options,seperated,by,commas) timelimit:(time the poll should be open for. defaults to 1h if not given)\n' + client.config.prefix + 'poll edit id:(id of the poll to edit) title:(new poll title) options:(new,options) emotes(new,emotes)\n IMPORTANT: The names of the poll options MUST be relative to the emote names! i.e. options:(cat,dogs) emotes(:cat:,:dog:)'
};