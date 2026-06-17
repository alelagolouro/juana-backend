require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuramos la IA. Usamos 'gemini-1.5-pro' que es el más robusto actualmente.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

app.post('/chat', async (req, res) => {
    try {
        const mensaje = req.body.mensaje || "Hola";
        
        // Ejecución de la IA
        const result = await model.generateContent(mensaje);
        const respuesta = await result.response.text();
        
        res.json({ respuesta });
    } catch (error) {
        // Log para consola de Render
        console.error("ERROR DETECTADO:", error);
        
        // Respuesta detallada para ReqBin
        res.status(500).json({ 
            mensaje: "Error en la IA",
            errorDetalle: error.message,
            stack: error.stack 
        });
    }
});

app.get('/', (req, res) => {
    res.send('Juana está escuchando.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Juana lista en ' + PORT));
