require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// INICIALIZACIÓN MÍNIMA
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Si esto sigue fallando, prueba cambiando el string por "gemini-1.5-flash" a secas
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/chat', async (req, res) => {
    try {
        const result = await model.generateContent(req.body.mensaje);
        const respuesta = result.response.text();
        res.json({ respuesta });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
