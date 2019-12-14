const express = require("express");
const fetch = require("node-fetch");
const app = express();
const util = require("util");

const baseUrl = "https://marudor.de";

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/*", async function(req, res) {
  const response = await fetch(`${baseUrl}${req.originalUrl}`);
  const json = await response.json();
  res.send(json);
});

app.post("/*", async function(req, res) {
  try {
    const response = await fetch(`${baseUrl}${req.originalUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    const json = await response.json();
    res.send(json);
  } catch (e) {
    console.error(e);
  }
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
