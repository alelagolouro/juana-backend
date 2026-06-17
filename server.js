require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        // Usamos gemini-1.0-pro que es el más estable en la API v1
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${process.env.API_KEY}`;
        
        const bodyData = {
            contents: [{
                parts: [{ text: req.body.mensaje }]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        const data = await response.json();
        
        if (!response.ok) throw new Error(JSON.stringify(data));

        // Accedemos a la respuesta del modelo 1.0-pro
        const respuesta = data.candidates[0].content.parts[0].text;
        res.json({ respuesta });
        
    } catch (error) {
        console.error("ERROR FINAL:", error);
        res.status(500).json({ error: "Fallo directo en API: " + error.message });
    }
});

app.listen(3000, () => console.log('Juana lista en puerto 3000'));
