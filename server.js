const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos la IA directamente
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// Usamos el nombre básico que suele estar disponible en todas las cuentas
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatHistory = [];

app.post('/chat', async (req, res) => {
    const { mensaje } = req.body;
    if (!mensaje) return res.status(400).json({ respuesta: "Dime algo, hijo." });

    try {
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(mensaje);
        const respuesta = await result.response.text();
        res.json({ respuesta });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ respuesta: "Error: " + error.message });
    }
});

app.listen(3000, () => console.log('Juana lista en 3000'));
