require('dotenv').config();

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const connectToDatabase = require('./database/connect');
const cookieParser = require("cookie-parser");
const apiRouter = require('./routes/apiRouter');
const pagesRouter = require('./routes/pages');

const PORT = process.env.PORT || 4004;

const app = express();

connectToDatabase()


app.use(
    cors,
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, 'public')),
    
); 

app.listen(PORT, () => {
	console.log(`The project was launched on  ${PORT}`);
});

