// server.js
const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.get('/proxy', (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL query parameter is required.');
    }

    request({ url: url, method: 'GET' }, (error, response, body) => {
        if (error) {
            return res.status(500).send('Error fetching the URL.');
        }
        res.send(body);
    });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
