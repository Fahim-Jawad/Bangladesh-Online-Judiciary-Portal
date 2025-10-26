const express = require("express");
const mongoose = require('mongoose')
const app = express();
var cors = require("cors");
// middleware
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const { readdirSync, read } = require("fs");

//  routes
readdirSync("./routes").map((routefilename) => app.use("/", require("./routes/"+routefilename)))
const port = process.env.PORT || 8000;


//database
mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("database Connected")
})

app.listen(port, () => {
  console.log(`app is runnung on port ${port}`);
});
