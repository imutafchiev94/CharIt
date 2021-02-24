const mongoose = require('mongoose');
require('dotenv').config();

module.exports = (app) => {
    mongoose.connect(process.env.CONNECTION_STRING, {useCreateIndex: true, useUnifiedTopology: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Database connected");
    });
}