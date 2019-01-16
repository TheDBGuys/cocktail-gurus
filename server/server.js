const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;
const cocktailController = require('./controllers/cocktailController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/cocktails', cocktailController.getCocktails);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
