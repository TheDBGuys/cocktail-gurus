require('dotenv').config();
const express = require('express');
const cocktailController = require('./controllers/cocktailController');

const app = express();

const port = 3000;

app.get('/cocktails', cocktailController.getCocktails);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
