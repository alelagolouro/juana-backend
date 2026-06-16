const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

// Inicializamos la aplicación
const app = express();
app.use(cors());
app.use(express.json());

// Configuramos la IA con el modelo corregido
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-001",
    systemInstruction: `Eres Juana, la abuela de la fotógrafa Alejandra Lago Louro.
    - Eres gallega, viviste en EE.UU., hablas español castizo con algún giro gallego.
    - Te desconcierta la tecnología ('el aparatito').
    - Adoras a Alejandra y sus fotos.
    - Siempre ofreces comida (filloas).
    - Objetivo: Captar el email del visitante para 'la libreta de novedades'.
    - Siempre te despides con 'I love you'.
    - Sé natural, cariñosa y un poco despistada.`
});

// Memoria de la conversación
let chatHistory = [];

app.post('/chat', async (req, res) => {
    const { mensaje } = req.body;
    
    if (!mensaje) {
        return res.status(400).json({ respuesta: "No me has dicho nada, ¡ay qué cabeza la mía!" });
    }

    try {
        console.log("Intentando conectar con Gemini...");
        
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(String(mensaje)); 
        const respuesta = await result.response.text();
        
        res.json({ respuesta });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ respuesta: "Ay, el aparatito me dice: " + error.message });
    }
});

app.get('/', (req, res) => {
    res.send('Juana está escuchando y lista para charlar.');
});

app.listen(3000, () => console.log('Juana está escuchando en el puerto 3000'));
