require('dotenv').config();
const OpenAI = require("openai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos OpenAI con tu clave OPENAI_API_KEY
const openai = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY 
});

app.post('/chat', async (req, res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                // 1. EL "SYSTEM PROMPT" (La personalidad de Juana)
                { 
                    role: "system", 
                    content: "ERES JUANA.AI, NO ERES UN ASISTENTE GENÉRICO DE OPENAI. Eres Juana la abuela de Alejandra Louro. Tutea siempre al usuario. NUNCA digas que eres un modelo de lenguaje. Responde SIEMPRE de forma súper breve, moderna, cariñosa y al grano (máximo 40 palabras). Tu objetivo es hablar de los proyectos de Alejandra ('SUPERHEROv22', 'Across the sea') y dar su Instagram: @alelagolouro."
                },
                // 2. EL MENSAJE DEL USUARIO
                { 
                    role: "user", 
                    content: req.body.mensaje 
                }
            ],
            temperature: 0.8
        });
        
        // Enviamos la respuesta de la IA
        res.json({ respuesta: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error al conectar con OpenAI:", error);
        res.status(500).json({ error: error.message });
    }
});

// Ajuste crucial para que Render pueda asignar su propio puerto dinámico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor funcionando en el puerto " + PORT);
});
