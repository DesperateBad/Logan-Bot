// Define variables and libraries needed
const Discord = require("discord.js");
const client = new Discord.Client();

const Enmap = require("enmap");
const { promisify } = require("util");
const chalk = require("chalk");
const readdir = promisify(require("fs").readdir);
const SQLite = require("better-sqlite3");
const sql = new SQLite("./src/databases/slots/slotwins.sqlite");

const http = require("http");
const Express = require("express");
const express = Express();

client.sql = sql;
client.config = require("./config.js");

require("./src/functions/functions.js")(client);
require("./src/functions/randomImageFunctions.js")(client);

// Start website
require("./web/index.js")(client);


client.commands = new Enmap();
client.aliases = new Enmap();

client.serverConfig = new Enmap({
  name: "serverConfig",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
});

client.cooldownProvider = new Map();

client.on("ready", async () => {
  var cmds = await readdir("./commands/");
  console.log(`Online and active on ${client.guilds.size} servers.`);
  client.user.setActivity(client.config.prefix + `help | ${cmds.length} Commands`, {type: 'PLAYING'});
  
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotwins';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE slotwins (id TEXT PRIMARY KEY, user TEXT, guild TEXT, wins INTEGER);").run();
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

  const evtFiles = await readdir("./events/");
  console.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
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
