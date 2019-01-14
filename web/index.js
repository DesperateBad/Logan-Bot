const url = require("url");
const path = require("path");

const Discord = require("discord.js");

const express = require("express");
const app = express();
const moment = require("moment");
require("moment-duration-format");

const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session)
const Strategy = require("passport-discord").Strategy;

const helmet = require("helmet");

const md = require("marked");

module.exports = (client) => {

  const dataDir = path.resolve(`${process.cwd()}${path.sep}web`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(new Strategy({
    clientID: '470864521842655252',
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: client.config.callbackURL,
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  }));

  app.use(session({
    store: new MemoryStore({ checkPeriod: 109900000 }),
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  app.locals.domain = client.config.domain;
  
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); 

  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/logan/login");
  }
    
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null,
      less: data.less ? data.less : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/logan/dashboard/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/logan/autherror" }), (req, res) => {
    if (client.config.webAdmins.indexOf(`${req.user.id}`) > -1) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.isAdmin) {
      res.redirect("/logan/dashboard");
    } else {
      res.redirect("/logan/");
    }
  });
  
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/logan/");
    });
  });

  app.get("/", async (req, res) => {
    renderTemplate(res, req, "index.ejs", {less: 'index'});
  });


  app.get("/commands", (req, res) => {
    renderTemplate(res, req, "commands.ejs", {md});
  });

  app.get("/dbl", (req, res) => {
    renderTemplate(res, req, "dbl.ejs");
  });
  
  app.get("/stats", (req, res) => {
    /* const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const members = client.guilds.reduce((p, c) => p + c.memberCount, 0);
    const textChannels = client.channels.filter(c => c.type === "text").size;
    const voiceChannels = client.channels.filter(c => c.type === "voice").size;
    const guilds = client.guilds.size; */
    renderTemplate(res, req, "stats.ejs");
  });

  app.get("/dashboard", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });

  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    renderTemplate(res, req, "admin.ejs");
  });
  
  app.get("/help", (req, res) => {
    renderTemplate(res, req, "help/help.ejs");
  });
  
  app.get("/help/:helpPage", (req, res) => {
    renderTemplate(res, req, `help/${req.params.helpPage}`, {active: `${req.params.helpPage}`});
  });

  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });

  app.get("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/manage.ejs", {guild});
  });
  
  app.post("/api/:guildID/enableCommand", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.enableGuildCommand(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/disableCommand", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.disableGuildCommand(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  
  app.post("/api/:guildID/changeNickname", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    guild.setNickname(req.body.nickname);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/changePrefix", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.setProp(guild.id, 'prefix', `${req.body.prefix}`);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event/announcementMessage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.body.event;
    const newMessage = req.body.message;
    if (!guild || !event || !newMessage) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.setProp(guild.id, `${req.body.event}.announcementMessage`, `${req.body.message}`);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event/announcementChannel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.body.event;
    const newChannel = req.body.channel;
    if (!guild || !event || !newChannel) return res.status(404);
    const guildConf = client.serverConfig.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.setProp(guild.id, `${req.body.event}.announcementChannel`, `${req.body.channel}`);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.body.event;
    if (!guild || !event) return res.status(404);
    const guildConf = client.serverConfig.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.changeEventStatus(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.get("/dashboard/:guildID/leave", checkAuth, async (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/dashboard");
  });

  app.get("/dashboard/:guildID/reset", checkAuth, async (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/logan/");
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.delete(guild.id);
    res.redirect("/dashboard/"+req.params.guildID);
  });
  
  // 404 Page
  app.use(function(req, res, next) {
    res.status(404)
    if (req.accepts('html')) {
      renderTemplate(res, req, '404.ejs', { url: req.url });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Error 404: Page not found' });
      return;
    }
    res.type('txt').send('Error 404: Page not found');
  });
  
  client.site = function() { 
    app.listen(process.env.PORT);
    console.log("System: Web UI up and running cap'n!");
  }
};