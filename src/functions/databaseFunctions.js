const SQLite = require("better-sqlite3");
const Enmap = require("enmap");

const slotsSQL = new SQLite("../databases/slots/slotwins.sqlite");
const inventorySQL = new SQLite("../databases/inventories/inventories.sqlite")
const shopSQL = new SQLite("../databases/shop/shop.sqlite");

module.exports = (client) => {

    // Slots database
    client.slotsSQL = slotsSQL;

    const slotsTable = slotsSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'slotwins';").get();
    if (!slotsTable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        slotsSQL.prepare("CREATE TABLE slotwins (id INTEGER PRIMARY KEY, user TEXT, guild TEXT, wins INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        slotsSQL.prepare("CREATE UNIQUE INDEX idx_slotwins_id ON slotwins (id);").run();
        slotsSQL.pragma("synchronous = 1");
        slotsSQL.pragma("journal_mode = wal");
    }

    client.getWins = slotsSQL.prepare("SELECT * FROM slotwins WHERE user = ? AND guild = ?");
    client.setWins = slotsSQL.prepare("INSERT OR REPLACE INTO slotwins (id, user, guild, wins) VALUES (@id, @user, @guild, @wins);");

    // Shop database
    client.shopSQL = shopSQL;

    const shopItems = shopSQL.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'shopItems';").get();
    if (!shopItems['count(*)']) {
        shopSQL.prepare("CREATE TABLE shopItems (id INTEGER AUTO_INCREMENT PRIMARY KEY, category TEXT, name TEXT, stock INTEGER, price NUMERIC);").run();
        shopSQL.prepare("CREATE UNIQUE INDEX idx_shopitems_id ON shopItems (id);").run();
        shopSQL.pragma("synchronous = 1");
        shopSQL.pragma("journal_mode = wal");
    }

    client.getTopShopItems = shopSQL.prepare("SELECT TOP 9 name, stock, price FROM shopItems");
    client.getTopCategoryItems = shopSQL.prepare("SELECT TOP 9 name, stock, price FROM shopItems WHERE category = ?");
    client.getShopItem = shopSQL.prepapre("SELECT category, name, stock, price FROM shopItems WHERE id = ?");
    client.getShopItemName = shopSQL.prepare("SELECT name FROM shopItems WHERE id = ?");
    client.getShopItemCategory = shopSQL.prepare("SELECT category FROM shopItems WHERE id = ?");
    client.getShopItemPrice = shopSQL.prepare("SELECT price FROM shopItems WHERE id = ?");
    client.getShopItemID = shopSQL.prepare("SELECT id FROM shopItems WHERE name = ?");
    client.getShopItemStock = shopSQL.prepare("SELECT stock FROM shopItems WHERE id = ?");

    client.changeItemProps = changeProps(name, newName, newCategory, newStock, newPrice);
    client.changeItemCategory = changeCategory(name, newCategory);
    client.changeItemName = changeName(name, newName);
    client.changeItemStock = changeStock(name, newStock);
    client.changeItemPrice = changePrice(name, newPrice);


    // Functions to change shop item properties
    async function changeProps(name, newName, newCategory, newStock, newPrice) {
        let itemID = client.getItemID(name);
        let origProps = client.getShopItem(itemID);

        const statement = shopSQL.prepare("REPLACE INTO shopItems (id, category, name, stock, price) VALUES (@id, @category, @name, @stock, @price);")

        statement.run(itemID, newCategory, newName, newStock, newPrice);
    }

    async function changeCategory(name, newCategory) {
        let itemID = client.getItemID(name);
        let origProps = client.getShopItem(itemID);

        const statement = shopSQL.prepare("INSERT INTO shopItems (id, category, name, stock, price) VALUES (@id, @category, @name, @stock, @price);")

        statement.run(itemID, newCategory, origProps.name, origProps.stock, origProps.price);
    }

    async function changeName(name, newName) {
        let itemID = client.getItemID(name);
        let origProps = client.getShopItem(itemID);

        const statement = shopSQL.prepare("INSERT INTO shopItems (id, category, name, stock, price) VALUES (@id, @category, @name, @stock, @price);")

        statement.run(itemID, origProps.category, newName, origProps.stock, origProps.price);
    }

    async function changeStock(name, newStock) {
        let itemID = client.getItemID(name);
        let origProps = client.getShopItem(itemID);

        const statement = shopSQL.prepare("INSERT INTO shopItems (id, category, name, stock, price) VALUES (@id, @category, @name, @stock, @price);")

        statement.run(itemID, origProps.category, origProps.name, newStock, origProps.price);
    }

    async function changePrice(name, newPrice) {
        let itemID = client.getItemID(name);
        let origProps = client.getShopItem(itemID);

        const statement = shopSQL.prepare("INSERT INTO shopItems (id, category, name, stock, price) VALUES (@id, @category, @name, @stock, @price);")

        statement.run(itemID, origProps.category, origProps.name, origProps.stock, newPrice);
    }
}