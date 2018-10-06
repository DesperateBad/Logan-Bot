const slotsSQL = new SQLite('../../databases/slots/slotwins.sqlite');
const SQLite = require("better-sqlite3");

module.exports = (client) => {


client.slotsSQL = slotsSQL;

const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotwins';").get();
  if (!table['count(*)']) {
    sql.prepare("CREATE TABLE slotwins (id TEXT PRIMARY KEY, user TEXT, guild TEXT, wins INTEGER);").run();
    sql.prepare("CREATE UNIQUE INDEX idx_slotwins_id ON slotwins (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
  
  client.getWins = sql.prepare("SELECT * FROM slotwins WHERE user = ? AND guild = ?");
  client.setWins = sql.prepare("INSERT OR REPLACE INTO slotwins (id, user, guild, wins) VALUES (@id, @user, @guild, @wins);");

}