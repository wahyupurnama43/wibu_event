const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const route = require("./routers/routers");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Event-s",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layout/master");
app.use(express.static(path.join(__dirname, "public")));

app.use(route);

app.listen(port, (error) => {
  console.log("http://localhost:3000/");
});
