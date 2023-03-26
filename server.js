const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const port = process.env.PORT || process.env.VCAP_APP_PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
