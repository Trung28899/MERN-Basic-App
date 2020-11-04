const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const productsRoute = require("./routes/productsRoute");

const app = express();

/*
  Setting up bodyparser for parsing requests
  information
*/
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});

/*
  post requests is sent from front-end
  to /products route
*/
app.use("/products", productsRoute);

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
