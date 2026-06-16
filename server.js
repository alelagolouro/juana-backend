const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require('express');
const cors = require('cors');

// Inicializamos la aplicación
const app = express();
app.use(cors());
app.use(express.json());

// Configuramos la IA con el modelo estable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
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
    try {
        console.log("Intentando conectar con Gemini...");
        const chat = model.startChat({ history: chatHistory });
        const result = await chat.sendMessage(mensaje);
        const respuesta = result.response.text();
        
        res.json({ respuesta });
    } catch (error) {
        console.error("ERROR DETECTADO:", error);
        res.status(500).json({ respuesta: "Ay, hijo/a, el aparatito no me deja contestar ahora... " + error.message });
    }
});

// Ruta simple para comprobar si el servidor está vivo
app.get('/', (req, res) => {
    res.send('Juana está escuchando y lista para charlar.');
});

app.listen(3000, () => console.log('Juana está escuchando en el puerto 3000'));