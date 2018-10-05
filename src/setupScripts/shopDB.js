const SQLite = require("better-sqlite3");
const shopItemsSQL = new SQLite('../../shopDatabases/shopItems.sqlite');
const bankSQL = new SQLite('../../shopDatabases/bank.sqlite');

module.exports = (client) => {

const bank = bankSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bank';").get();
  if (!bank['count(*)']) {
    banksSQL.prepare("CREATE TABLE bank (id TEXT PRIMARY KEY, user TEXT, coins INTEGER);").run();
    banksSQL.prepare("CREATE UNIQUE INDEX idx_bank_id ON bank (id);").run();
    banksSQL.pragma("synchronous = 1");
    banksSQL.pragma("journal_mode = wal");
  }
  
  client.getCoins = banksSQL.prepare("SELECT * FROM bank WHERE user = ?");
  client.setCoins = banksSQL.prepare("INSERT OR REPLACE INTO bank (id, user, coins) VALUES (@id, @user, @coins);");


const shopItems = shopItemsSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'shopItems';").get();
  if (!bank['count(*)']) {
    shopItemsSQL.prepare("CREATE TABLE  (category TEXT, id TEXT PRIMARY KEY name TEXT, limit INTEGER, cost INTEGER);").run();
    shopItemsSQL.prepare("CREATE UNIQUE INDEX idx_shopItems_id ON shopItems (id);").run();
    shopItemsSQL.pragma("synchronous = 1");
    shopItemsSQL.pragma("journal_mode = wal");
  }
  
  client.getShopItemsFromCat = shopItemsSQL.prepare("SELECT * FROM shopItems WHERE category = ?");
  client.getAllShoItems = shopItemsSQL.prepare("SELECT * FROM shopItems");

};