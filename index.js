// Define variables and libraries needed
const Discord = require("discord.js");
const client = new Discord.Client();

const Enmap = require("enmap");
const { promisify } = require("util");
const chalk = require("chalk");
const readdir = promisify(require("fs").readdir);
const SQLite = require("better-sqlite3");
const sql = new SQLite('./slotwins.sqlite');

// Stuff to keep bot alive on line #129
const http = require("http");
const express = require("express");
const pinger = express();

client.sql = sql;
client.config = require("./config.js");

require("./src/functions/functions.js")(client);
require("./src/misc/randomImageFunctions.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();

client.serverConfig = new Enmap({
                            name: "serverConfig",
                            fetchAll: false,
                            autoFetch: true,
                            cloneLevel: 'deep'
                          });

client.cooldownProvider = new Map();

client.on("ready",() => {
  console.log(`Online and active on ${client.guilds.size} servers.`);
  client.user.setActivity(client.config.prefix + `help | ${client.guilds.size} Servers`, {type: 'WATCHING'});
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotwins';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE slotwins (id TEXT PRIMARY KEY, user TEXT, guild TEXT, wins INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_slotwins_id ON slotwins (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  
  client.getWins = sql.prepare("SELECT * FROM slotwins WHERE user = ? AND guild = ?");
  client.setWins = sql.prepare("INSERT OR REPLACE INTO slotwins (id, user, guild, wins) VALUES (@id, @user, @guild, @wins);");
});

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
