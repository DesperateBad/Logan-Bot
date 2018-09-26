const http = require("http");
const express = require("express");
const pinger = express();

console.log("Started fake script");

pinger.get("/", (request, response) => {
  response.sendStatus(200);
});
pinger.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);