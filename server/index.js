// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require("express");
const app = express();
const axios = require('axios');
const cors = require('cors');


app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Home page</h1>");
});

app.get('/search', (req, res) => {
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURI(req.query.query)}`).then(response => {
        res.send(response.data)
    }).catch(error => console.error('Ocurrio un error en la consulta de productos: ', error));
});

app.get('/search-item', (req, res) => {
    axios.get(`https://api.mercadolibre.com/items/${req.query.id}`).then(response => {
        res.send(response.data)
    });
});

app.get('/search-description', (req, res) => {
    axios.get(`https://api.mercadolibre.com/items/${req.query.id}/description`).then(response => {
        res.send(response.data)
    });
});

app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
});

app.listen(8080, () => console.log('Server started on port 8080'));
