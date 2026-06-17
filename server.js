require('dotenv').config();
const OpenAI = require("openai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos OpenAI con tu nueva clave OPENAI_API_KEY
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

app.post('/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: req.body.mensaje }],
            model: "gpt-3.5-turbo",
        });
        
        // Enviamos la respuesta de la IA
        res.json({ respuesta: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error al conectar con OpenAI:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Servidor funcionando en el puerto 3000");
});
