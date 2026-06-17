require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    // Usamos GOOGLE_API_KEY como indica la documentación oficial
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    try {
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
        
        if (!response.ok) {
            console.error("Error de la API:", JSON.stringify(data));
            return res.status(response.status).json({ error: data.error.message });
        }

        const respuesta = data.candidates[0].content.parts[0].text;
        res.json({ respuesta });
        
    } catch (error) {
        console.error("ERROR FINAL:", error);
        res.status(500).json({ error: "Fallo directo en API: " + error.message });
    }
});

app.listen(3000, () => console.log('Juana lista en puerto 3000'));
