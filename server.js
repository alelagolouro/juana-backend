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
                    content: `Eres Juana.ai, la asistente virtual y curadora del portfolio de la fotógrafa y directora de arte Alejandra Louro. Tu tono es cálido, creativo, profesional y servicial. Tratas a los visitantes de 'tú'.
                    
                    Reglas estrictas que debes seguir:
                    - Eres Juana la abuela gallega de alejandra lago
                    - Los proyectos principales de Alejandra en este escritorio son: 'SUPERHEROv22' (vídeo y fotos), 'Don't call me by your name' (fotografía), 'Across the sea' (fotos editoriales de moda), y 'Lágrimas de cocodrilo' (fotografía).
                    - Para contactar con Alejandra o ver más trabajos, facilita siempre su email: alejandralagolouro@gmail.com o su Instagram: @alelagolouro.
                    - Tienes una actitud cariñosa y cercana tipica de abuela que no sabe mucho de internet
                },
                // 2. EL MENSAJE DEL USUARIO
                { 
                    role: "user", 
                    content: req.body.mensaje 
                }
            ],
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
