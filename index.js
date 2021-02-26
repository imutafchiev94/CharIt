const express = require('express');

const config = require('./config/config');
const router = require('./routes');
const path = require('path');

const app = express();

require('./config/expressConfig')(app);
require('./config/mongooseConfig')(app);


app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
app.use(router);

app.listen(config.PORT, () => console.log(`Server is listening on ${config.PORT}`));

// app.get('/', (req, res) => {

//     var organizations = [{name: "org1"}, {name: "org2"}];


//     res.render("landing", {organizations: organizations});
// })