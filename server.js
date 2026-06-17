require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Usamos el cliente estándar, pero apuntando a la v1 directamente
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash"
});

app.post('/chat', async (req, res) => {
    try {
        const chat = model.startChat({ history: [] });
        const result = await chat.sendMessage(req.body.mensaje);
        res.json({ respuesta: result.response.text() });
    } catch (error) {
        // Esto captura el error real si algo falla
        console.error("Error detallado:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
