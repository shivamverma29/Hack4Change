const express = require("express");
const router2 = express.Router();
const https = require("https");

router2.post("/generate-poster", (req, res) => {
    const { companyName, postDescription } = req.body;
  
    const prompt = `Generate a poster for ${companyName} in english. The poster should attract people by highlighting: ${postDescription}. Create a simple poster.`;
  
    const options = {
      method: "POST",
      hostname: "open-ai21.p.rapidapi.com",
      port: null,
      path: "/texttoimage2",
      headers: {
        "x-rapidapi-key": "e46a086c0emsh85c1fc1e5fe752cp1be4f3jsn5c3e2a33f227",
        "x-rapidapi-host": "open-ai21.p.rapidapi.com",
        "Content-Type": "application/json",
      },
    };
  
    const request = https.request(options, (response) => {
      const chunks = [];
  
      response.on("data", (chunk) => {
        chunks.push(chunk);
      });
  
      response.on("end", () => {
        const body = Buffer.concat(chunks).toString();
        res.json(JSON.parse(body));
      });
    });
  
    request.write(
      JSON.stringify({
        text: prompt,
      })
    );
    request.end();
  });

  module.exports=router2;