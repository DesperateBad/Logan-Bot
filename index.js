// Define variables and libraries needed
const Discord = require("discord.js");
const client = new Discord.Client();
const Jukebox = require('discord.js-musicbot-addon');

const Enmap = require("enmap");
const { promisify } = require("util");
const chalk = require("chalk");
const readdir = promisify(require("fs").readdir);

// Stuff to keep bot alive on line #99
const http = require("http");
const express = require("express");
const pinger = express();

client.config = require("./config.js");

require("./src/functions.js")(client);
require("./src/misc/randomImageFunctions.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();

client.serverConfig = new Enmap({
                            name: "serverConfig",
                            fetchAll: false,
                            autoFetch: true,
                            cloneLevel: 'deep'
                          });

// client.cooldownProvider = new Set();

client.on("ready",() => {
  console.log(`Online and active on ${client.guilds.size} servers.`);
  client.user.setActivity(client.config.prefix + `help | ${client.guilds.size} Servers`, {type: 'WATCHING'});
});

/* Jukebox.start(client, {
  youtubeKey: "AIzaSyAx0mFXmgOrtiNg22YdJWoEqPQuBjYG27w",
  prefix: '?jb ',
  thumbnailType: 'medium',
  mazQueueSize: '500',
  botOwner: client.config.ownerID,
  clearOnLeave: true,
  embedColor: 0xf29837,
  anyoneCanSkip: true,
  helpCmd: 'help',
  playCmd: 'play',
  skipCmd: 'skip',
  queueCmd: 'queue',
  pauseCmd: 'pause',
  resumeCmd: 'resume',
  disableVolume: true,
  leaveCmd: 'leave',
  clearCmd: 'clearqueue',
  clearAlt: ['clear'],
  setCmd: 'set',
  loopCmd: 'loop',
  searchCmd: 'search',
  JoinCmd: 'join',
  logging: true,
  botAdmins: [client.config.ownerID]
}); */

const init = async () => {

 const cmdFiles = await readdir("./commands/");
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
      const thisLevel = client.config.permLevels[i];
      client.levelCache[thisLevel.name] = thisLevel.level;
  } 

  client.login(process.env.TOKEN);

};

init();

pinger.get("/", (request, response) => {
  response.sendStatus(200);
});
pinger.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
