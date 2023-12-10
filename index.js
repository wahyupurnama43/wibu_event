const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const route = require("./routers/routers");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layout/master");
app.use("/", express.static("public"));
app.use("/dashboard", express.static("public/dashboard"));

app.use(route);

app.listen(port, (error) => {
  console.log("http://localhost:3000/");
});
