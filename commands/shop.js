const Discord = require("discord.js");
const SQLite = require("better-sqlite3");

exports.run = (client, message, args, level) => {

    const action = args[0];

    if (!action || action === "view") client.viewShop(message.author.id);
    if (action === "buy") client.buyItem(message.author.id);
    if (action === "sell") client.sellItem(message.author.id);


}