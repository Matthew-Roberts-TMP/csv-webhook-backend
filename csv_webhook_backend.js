const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const WEBHOOK_URL = process.env.WEBHOOK_URL;

app.post("/send", async (req, res) => {
    try {
        if (!WEBHOOK_URL) {
            return res.status(500).json({ error: "Webhook URL is not set." });
        }

        const jsonData = req.body.data;
        if (!jsonData) {
            return res.status(400).json({ error: "No data provided." });
        }

        const response = await axios.post(WEBHOOK_URL, JSON.parse(jsonData), {
            headers: { "Content-Type": "application/json" }
        });

        res.json({ success: true, response: response.data });
    } catch (error) {
        res.status(500).json({ error: "Failed to send data", details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
