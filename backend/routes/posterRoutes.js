const express = require("express");
const router2 = express.Router();

router2.post("/generate-poster", async (req, res) => {
    const fetch = (await import('node-fetch')).default;

    const { companyName, postDescription } = req.body;

    const prompt = `Generate a poster for company:${companyName} description: ${postDescription}`;

    const data = { inputs: prompt };

    // Function to query the Hugging Face model
    async function query(data) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            {
                headers: {
                    Authorization: "Bearer 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",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.blob();
        return result;
    }

    try {
        const imageBlob = await query(data);
        
        // Convert the blob to a base64 string
        const base64Image = await imageBlob.arrayBuffer().then(buffer => Buffer.from(buffer).toString('base64'));
        
        // Create a data URL for the image
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        res.json({ imageUrl });
    } catch (error) {
        res.status(500).json({ error: "Image generation failed" });
    }
});

module.exports = router2;
