const express = require('express');

const config = require('./config/config');
const router = require('./routes');

const app = express();

require('./config/expressConfig')(app);
require('./config/mongooseConfig')(app);

//app.use(router);

app.listen(config.PORT, () => console.log(`Server is listening on ${config.PORT}`));

app.get('/', (req, res) => {
    res.send("work");
})