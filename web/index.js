// Native Node Imports
const url = require("url");
const path = require("path");

// Used for Permission Resolving...
const Discord = require("discord.js");

// Express Session
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
  // It's easier to deal with complex paths. 
  // This resolves to: yourbotdir/web/
  const dataDir = path.resolve(`${process.cwd()}${path.sep}web`);

  // This resolves to: yourbotdir/web/templates/ 
  // which is the folder that stores all the internal template files.
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  // The public data directory, which is accessible from the *browser*. 
  // It contains all css, client javascript, and images needed for the site.
  app.use("/public", express.static(path.resolve(`${dataDir}${path.sep}public`)));

  // These are... internal things related to passport. Honestly I have no clue either.
  // Just leave 'em there.
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
  
  // Session data, used for temporary storage of your visitor's session information.
  // the `secret` is in fact a "salt" for the data, and should not be shared publicly.
  app.use(session({
    store: new MemoryStore({ checkPeriod: 109900000 }),
    secret: process.env.SESSION_TOKEN,
    resave: false,
    saveUninitialized: false,
  }));

  // Initializes passport and session.
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  // The domain name used in various endpoints to link between pages.
  app.locals.domain = client.config.domain;
  
  // The EJS templating engine gives us more power to create complex web pages. 
  // This lets us have a separate header, footer, and "blocks" we can use in our pages.
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  // body-parser reads incoming JSON or FORM data and simplifies their
  // use in code.
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

  /* 
  Authentication Checks. For each page where the user should be logged in, double-checks
  whether the login is valid and the session is still active.
  */
  function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  // This function simplifies the rendering of the page, since every page must be rendered
  // with the passing of these 4 variables, and from a base path. 
  // Objectassign(object, newobject) simply merges 2 objects together, in case you didn't know!
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

    
  /** PAGE ACTIONS RELATED TO SESSIONS */

  // The login page saves the page the person was on in the session,
  // then throws the user to the Discord OAuth2 login page.
  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  // Once the user returns from OAuth2, this endpoint gets called. 
  // Here we check if the user was already on the page and redirect them
  // there, mostly.
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/autherror" }), (req, res) => {
    if (req.user.id === client.config.ownerID) {
      req.session.isAdmin = true;
    } else {
      req.session.isAdmin = false;
    }
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  
  // If an error happens during authentication, this is what's displayed.
  app.get("/autherror", (req, res) => {
    renderTemplate(res, req, "autherror.ejs");
  });

  // Destroys the session to log out the user.
  app.get("/logout", function(req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/"); //Inside a callback… bulletproof!
    });
  });

  /** REGULAR INFORMATION PAGES */

  // Index page. If the user is authenticated, it shows their info
  // at the top right of the screen.
  app.get("/", async (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });


  // The list of commands the bot has.
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
    const perms = Discord.EvaluatedPermissions;
    renderTemplate(res, req, "dashboard.ejs", {perms});
  });

  // The Admin dashboard is similar to the one above, with the exception that
  // it shows all current guilds the bot is on, not *just* the ones the user has
  // access to. Obviously, this is reserved to the bot's owner for security reasons.
  app.get("/admin", checkAuth, (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/");
    renderTemplate(res, req, "admin.ejs");
  });

  // Simple redirect to the "Settings" page (aka "manage")
  app.get("/dashboard/:guildID", checkAuth, (req, res) => {
    res.redirect(`/dashboard/${req.params.guildID}/manage`);
  });

  // Settings page to change the guild configuration. Definitely more fancy than using
  // the `set` command!
  app.get("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    renderTemplate(res, req, "guild/manage.ejs", {guild});
  });

  // When a setting is changed, a POST occurs and this code runs
  // Once settings are saved, it redirects back to the settings page.
  app.post("/dashboard/:guildID/manage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.writeSettings(guild.id, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
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
    client.changeNickname(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/changePrefix", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.set(`${req.params.guildID}`, 'prefix', `${req.body.prefix}`);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event/:eventName/:announcementMessage", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.params.eventName;
    const newMessage = req.params.announcementMessage;
    if (!guild || !event || !newMessage) return res.status(404);
    const guildConf = client.serverConfig.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    // client.changeEventAnnouncementMessage(guild, req.body);
    console.log(req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event/:eventName/:announcementChannel", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.params.eventName;
    const newChannel = req.params.announcementChannel;
    if (!guild || !event || !newChannel) return res.status(404);
    const guildConf = client.serverConfig.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.changeEventAnnouncementChannel(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  app.post("/api/:guildID/event/:eventName", checkAuth, (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    const event = req.params.eventName;
    if (!guild || !event) return res.status(404);
    const guildConf = client.serverConfig.get(req.params.guildID);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.changeEventStatus(guild, req.body);
    res.redirect("/dashboard/"+req.params.guildID+"/manage");
  });
  
  // Leaves the guild (this is triggered from the manage page, and only
  // from the modal dialog)
  app.get("/dashboard/:guildID/leave", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    await guild.leave();
    res.redirect("/dashboard");
  });

  // Resets the guild's settings to the defaults, by simply deleting them.
  app.get("/dashboard/:guildID/reset", checkAuth, async (req, res) => {
    const guild = client.guilds.get(req.params.guildID);
    if (!guild) return res.status(404);
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/");
    client.serverConfig.delete(guild.id);
    res.redirect("/dashboard/"+req.params.guildID);
  });
  
  client.site = function() { 
    app.listen(process.env.PORT);
    console.log("System: Web UI up and running cap'n!");
  }
};