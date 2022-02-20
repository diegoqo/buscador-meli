const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();


app.use(cors());

app.get('/search', (req, res) => {
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURI(req.query.query)}`).then(response => {
        res.send(response.data)
    }).catch(error => console.error('Ocurrio un error en la consulta de productos: ', error));
});

app.get('/search-item', (req, res) => {
    axios.get(`https://api.mercadolibre.com/items/${req.query.id}`).then(response => {
        res.send(response.data)
    }).catch(error => console.error('Ocurrio un error en la consulta de item por id: ', error));
});

app.get('/search-description', (req, res) => {
    axios.get(`https://api.mercadolibre.com/items/${req.query.id}/description`).then(response => {
        res.send(response.data)
    }).catch(error => console.error('Ocurrio un error en la consulta de descripción del item: ', error));
});

app.listen(8080, () => console.log('Server started on port 8080'));
