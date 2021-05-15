const express = require("express");
const mongoose = require("mongoose");

const Shorten = require("./models/shorten");

// const db = mongoose.connection;

mongoose.connect(
  "mongodb://localhost/shortener",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("mongo is connecting...");
  }
);

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const items = await Shorten.find({});
  res.render("index", { items });
});

app.post("/shorten", async (req, res) => {
  console.log(req.body.url);
  const shorten = await new Shorten({ url: req.body.url });
  console.log(shorten);
  try {
    await shorten.save();
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
});

app.get("/:shortURL", async (req, res) => {
  try {
    const result = await Shorten.findOne({ shorten: req.params.shortURL });
    console.log(result);
    return res.redirect(result.url);
  } catch (e) {
    return res.status(500).send("URL not existed");
  }
});

app.listen(3000, () => console.log("App is listenning..."));
