const express = require("express"),
  bodyParser = require("body-parser"),
  connectDb = require("../config/db"),
  passport = require("passport"),
  cors = require("cors"),
  parseurl = require("parseurl");

let app = express(),
  session = require("express-session"),
  userRoutes = require("../routes/users.routes"),
  db = connectDb(),
  sess = {
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: true,
    name: "sessionID",
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.TIME),
    },
  },
  corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 200,
  };

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(cors(corsOptions));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (!req.session.views) {
    req.session.views = {};
  }
  let pathname = parseurl(req).pathname;
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});


app.use("/api", userRoutes);

module.exports = app;
