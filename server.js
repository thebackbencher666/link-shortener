const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Schema
const urlSchema = new mongoose.Schema({
    shortId: String,
    originalUrl: String,
});
const URL = mongoose.model("URL", urlSchema);

// Create Short URL
app.post("/shorten", async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = shortid.generate();
    await URL.create({ shortId, originalUrl });
    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
});

// Redirect Short URL
app.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const urlEntry = await URL.findOne({ shortId });
    if (urlEntry) {
        res.redirect(urlEntry.originalUrl);
    } else {
        res.status(404).json({ error: "URL not found" });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
