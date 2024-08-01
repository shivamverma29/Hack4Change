const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");

const path = require("path");
app.use(bodyParser.json());

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());

app.use("/api", require("./routes/lmsRoutes.js"));
app.use("/gen",require("./routes/posterRoutes.js"))
app.use("/auth",require("./routes/auth.js"))

app.listen(5000, async () => {
  console.log("connected to port" + 4000);
  try {
    await mongoose.connect(
      "mongodb+srv://sverma4be21:7vh4djSQN9HoRhus@cluster0.tnnmrss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error.message);
  }
});
