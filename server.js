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

    request({ url: url, method: 'GET' })
        .on('error', (err) => {
            res.status(500).send('Error fetching the URL.');
        })
        .pipe(res);
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});

