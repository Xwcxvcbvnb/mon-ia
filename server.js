const express = require("express");
const OpenAI = require("openai");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, rules } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message manquant." });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      instructions: rules || "Tu es un assistant utile et tu réponds en français.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur du serveur."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});
