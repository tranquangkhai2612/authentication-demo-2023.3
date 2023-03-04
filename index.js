const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://localhost:27017/AuthDemo", {})
  .then(() => {
    console.log("Mongo Connection Open !!!");
  })
  .catch((err) => {
    console.log("Oh No Mongo Connection Error !!!");
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is HOME PAGE");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { password, username } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash,
  });
  await user.save();
  res.redirect("/");
});

app.get("/secret", (req, res) => {
  res.send("This is secret");
});

app.listen(3000, () => {
  console.log("Serving Your App !");
});
