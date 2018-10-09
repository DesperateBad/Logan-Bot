const Enmap = require("enmap");
const SQLite = require("better-sqlite3");

module.exports = (client) => {

    // User inventory database
    client.userInventory = new Enmap({
        name: "userInventory",
        fetchAll: true,
        autoFetch: true,
        cloneLevel: "deep"
    })

    client.ensureGuildInv = (guild) => {
        guild.members.forEach((user) => {
            client.userInventory.ensure()
        })
    };

    client.buyItem = (user, guild) => {
        client.ensureGuildInv(guild);

    };

}