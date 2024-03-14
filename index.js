// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});
String.prototype.isNumber = function () {
  return /^\d+$/.test(this);
};

app.get("/api/:date?", async function (req, res) {
  const date = req.params.date;
  const currentDate = new Date();
  if (!date)
    return res
      .status(200)
      .json({ unix: currentDate.getTime(), utc: currentDate.toString() });
  const dateTime = new Date(date.isNumber() ? Number(date) : date);
  const times = { unix: dateTime.getTime(), utc: dateTime.toString() };
  if (!times.unix || times?.utc?.toLowerCase() === "invalid date")
    return res.status(400).json({ error: "Invalid Date" });
  return res.status(200).json(times);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
