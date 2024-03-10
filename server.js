const express = require('express');
const dotenv = require('dotenv');
const pageRoute =  require('./routes/pageRoutes');
const expressEjsLayouts = require('express-ejs-layouts');

// environment variable
dotenv.config();
const PORT = process.env.SERVER_PORT || 5050;

// init express
const app = express();

// init json data into express
app.use(express.json());
app.use( express.urlencoded ({ extended : false }));

// init ejs
app.set("view engine", "ejs");
app.use(expressEjsLayouts);
app.set("layout", "layouts/app");

    // static
    app.use(express.static('public'));

    // route
    app.use(pageRoute);




// server listen
app.listen(PORT, () => {
    console.log(`server is runnin on ${PORT}`);
})