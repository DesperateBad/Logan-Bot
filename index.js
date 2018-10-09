// Define variables and libraries needed
const Discord = require("discord.js");
const client = new Discord.Client();

const Enmap = require("enmap");
const { promisify } = require("util");
const chalk = require("chalk");
const readdir = promisify(require("fs").readdir);
const SQLite = require("better-sqlite3");
const sql = new SQLite("./src/databases/slots/slotwins.sqlite");
const requireDir = require("require-dir");

// Stuff to keep bot alive on line #129
const http = require("http");
const express = require("express");
const pinger = express();

client.sql = sql;
client.config = require("./config.js");

requireDir("./src/functions/")(client);


client.commands = new Enmap();
client.aliases = new Enmap();
client.items = new Enmap();

client.serverConfig = new Enmap({
  name: "serverConfig",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
});

client.cooldownProvider = new Map();

client.on("ready", () => {
  console.log(`Online and active on ${client.guilds.size} servers.`);
  client.user.setActivity(client.config.prefix + `help | ${client.guilds.size} Servers`, { type: 'WATCHING' });
});

const init = async () => {

  const cmdFiles = await readdir("./commands/");
  console.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  // Load item sripts
  const itemFolders = await readdir("./items/");
  itemFolders.forEach(folder => {
    const itemFiles = await readdir(`./items/${folder}/`);
    itemFiles.forEach(file => {
      if (!file.endsWith(".js")) return;
      const response = client.loadItem(folder, file);
      if (response) console.log(response);
    })
  })

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
