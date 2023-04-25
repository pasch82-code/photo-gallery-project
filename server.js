const express = require('express');
const path = require('path');

function createServer() {

    const port = 3001;
    const url = "http://localhost:3001"

    const app = express();
  
    app.use((req, res, next) => {
        if (req.url === '/') {
            res.header('Cache-Control', 'no-store')
        }
        next()
    })

    app.use(express.static(path.join(__dirname, 'dist')));

    //Handles any requests that don't match the ones above
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/dist/index.html'));
    });

    app.listen(port, async function () {
        console.log("Express nodejs server started",  url);
    });

    return app;
}

createServer();