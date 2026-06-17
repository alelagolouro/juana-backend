require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos la IA sin prefijos de versión para evitar el error 404/500
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/chat', async (req, res) => {
    try {
        const result = await model.generateContent(req.body.mensaje);
        const respuesta = result.response.text();
        res.json({ respuesta });
    } catch (error) {
        // Esto nos mostrará el error real en los logs
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Juana está escuchando.');
});

app.listen(3000);
