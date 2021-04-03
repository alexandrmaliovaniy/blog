const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const MongoConnect = require('./MongoConnect');
const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 3000;

MongoConnect(config.get('mongo'))
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is up on port: ${PORT}`);
    });
})
.catch((err) => {
    throw err;
})