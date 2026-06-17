require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN FORZADA A v1
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel(
  { model: "gemini-1.5-flash" },
  { apiVersion: "v1" } // Esto elimina el uso de v1beta
);

app.post('/chat', async (req, res) => {
    try {
        const result = await model.generateContent(req.body.mensaje);
        res.json({ respuesta: result.response.text() });
    } catch (error) {
        console.error("ERROR:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
