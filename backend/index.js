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
// app.use(bodyParser.json());
// const allowCors = (fn) => async (req, res) => {
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,OPTIONS,PATCH,DELETE,POST,PUT"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//   );
//   if (req.method === "OPTIONS") {
//     res.status(200).end();
//     return;
//   }
//   return await fn(req, res);
// };

app.use(cors());
app.options("*", cors()); // Allow preflight requests for all routes

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());

app.use("/api", require("./routes/lmsRoutes.js"));
app.use("/gen", require("./routes/posterRoutes.js"));
app.use("/auth", require("./routes/auth.js"));

app.get("/", (req, res) => {
  res.send("hi");
});

// const { exec } = require("child_process");

// app.get("/run-python", (req, res) => {
//   exec("python app.py", (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing script: ${error.message}`);
//       return res.status(500).send(error.message);
//     }

//     if (stderr) {
//       console.error(`Script stderr: ${stderr}`);
//       return res.status(500).send(stderr);
//     }

//     console.log(`Script stdout: ${stdout}`);
//     res.send(`Script output: ${stdout}`);
//   });
// });

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
