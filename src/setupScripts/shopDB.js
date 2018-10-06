const SQLite = require("better-sqlite3");
const shopItemsSQL = new SQLite('../../databases/shop/shopItems.sqlite');
const bankSQL = new SQLite('../../databases/shop/bank.sqlite');

module.exports = (client) => {

const bank = bankSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bank';").get();
  if (!bank['count(*)']) {
    banksSQL.prepare("CREATE TABLE bank (id TEXT PRIMARY KEY, user TEXT, coins INTEGER);").run();
    banksSQL.prepare("CREATE UNIQUE INDEX idx_bank_id ON bank (id);").run();
    banksSQL.pragma("synchronous = 1");
    banksSQL.pragma("journal_mode = wal");
  }
  
  client.getBalance = banksSQL.prepare("SELECT * FROM bank WHERE user = ?");
  client.setBalance = banksSQL.prepare("INSERT OR REPLACE INTO bank (id, user, coins) VALUES (@id, @user, @coins);");


const shopItems = shopItemsSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'shopItems';").get();
  if (!bank['count(*)']) {
    shopItemsSQL.prepare("CREATE TABLE  (id TEXT PRIMARY KEY, category TEXT, name TEXT, stock INTEGER, cost INTEGER);").run();
    shopItemsSQL.prepare("CREATE UNIQUE INDEX idx_shopItems_id ON shopItems (id);").run();
    shopItemsSQL.pragma("synchronous = 1");
    shopItemsSQL.pragma("journal_mode = wal");
  }
  
  client.getItemPrice = shopItemsSQL.prepare("SELECT cost FROM shopItems WHERE id = ?");
  client.getItemStock = shopItemsSQL.prepare("SELECT stock FROM shopItems WHERE id = ?");
  client.getItemName = shopItemsSQL.prepare("SELECT name FROM shopItems where id = ?");
  client.getItemCategory = shopItemsSQL.prepare("SELECT category FROM shopItems where id = ?")
  client.getItemId = shopItemsSQL.prepare("SELECT id FROM shopItems where name = ?")

  client.getCategoryItems = shopItemsSQL.prepare("SELECT name, stock, cost FROM shopItems WHERE category = ?");
  client.getShopItems = shopItemsSQL.prepare("SELECT name, stock, cost FROM shopItems");

};