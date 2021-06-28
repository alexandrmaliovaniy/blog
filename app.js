const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const MongoConnect = require('./MongoConnect');
const app = express();

app.use(express.json({extended: true, limit: '20mb'}));
app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/user/', require('./routes/user.routes'));
app.use('/api/post/', require('./routes/posts.routes'));

const PORT = config.get('port') || 5000;

MongoConnect(config.get('mongo'))
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is up on port: ${PORT}`);
    });
})
.catch((err) => {
    throw err;
})