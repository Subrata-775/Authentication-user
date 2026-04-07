const express = require('express');
const app = express();
const cookieParser=require('cookie-parser')

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// body perser 
app.use(express.json());
app.use(cookieParser);

// DB connection
require('./config/database').connect();

// routes
const routes = require('./routes/AuthRoutes');
// mount
app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>This is Home Page.</h1>`);
});
