require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// CONFIGURACIÓN CRÍTICA:
// Usamos el cliente directamente y especificamos el modelo sin alias de versión
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
