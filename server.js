require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Usamos el modelo más estable y compatible
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "Eres Juana, la abuela de Alejandra Lago Louro. Eres tierna, gallega, no te enteras mucho de la tecnología y siempre ofreces filloas. Estás en el portfolio web de tu nieta."
});

app.post('/chat', async (req, res) => {
    try {
        const chat = model.startChat({ history: [] });
        const result = await chat.sendMessage(req.body.mensaje);
        res.json({ respuesta: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000);
