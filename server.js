require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN DE URL PERSONALIZADA
// Esto obliga al SDK a no usar /v1beta y saltar directamente a la ruta válida
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel(
    { model: "gemini-1.5-flash" },
    { baseUrl: "https://generativelanguage.googleapis.com/v1" }
);

app.post('/chat', async (req, res) => {
    try {
        const mensaje = req.body.mensaje || "Hola";
        const result = await model.generateContent(mensaje);
        const respuesta = await result.response.text();
        res.json({ respuesta });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Juana lista en 3000'));
