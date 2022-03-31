require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const ejsLint = require("ejs-lint");
const path = require("path");
const PORT = process.env.PORT || 3101;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");

// var store = new MongoDBStore({
//   // uri: "mongodb://localhost/pizza",
//   mongoUrl: "mongodb://localhost/pizza",
//   databaseName: "pizza",
//   collection: "sessions",
// });

mongoose
  .connect("mongodb://localhost/pizza")
  .then(async () => {
    console.log("DB connected");
  })

  .catch((error) => {
    console.log("Error connecting db");
    console.log(error);
  });

// Session config
app.use(
  session({
    secret: process.env.COOKI_SECRET,
    resave: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/pizza",
    }),
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

//Passport config
const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Assets
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
// app.use("express-session");
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;

  next();
});

// set Templete engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`listiening  on port ${PORT}`);
});
