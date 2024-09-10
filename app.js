const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); 

const urlBase = 'https://rickandmortyapi.com/api/character';

app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get(urlBase);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;

    try {
        const response = await axios.get(`${urlBase}/?name=${characterName}`);
        if (response.data.results.length > 0) {
            res.json(response.data.results); 
            // console.log(response.data.results)
        } else {
            res.status(404).json({ error: 'Personaje no encontrado' });
        }
    } catch (error) {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
