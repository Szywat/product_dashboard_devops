const express = require('express');
const crypto = require('crypto');
const app = express();
const port = 8000;

app.use(express.json())

// Temporary db
let items = [];

const instanceId = crypto.randomUUID();

app.get('/items', (req, res) => {
    res.json(items)
});

app.post('/items', (req, res) => {
    const newItem = req.body;

    if (!newItem || Object.keys(newItem).length === 0) {
        return res.status(400).json({error: 'Brak danych produktu'});
    }

    items.push(newItem)
    res.status(201).json(newItem)
});

app.get('/stats', (req, res) => {
    res.json({
        totalItems: items.length,
        instanceId: instanceId
    });
});

app.listen(port);