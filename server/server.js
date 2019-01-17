const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;
const cocktailController = require('./controllers/cocktailController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET Routes
app.get('/recipes', cocktailController.getRecipes);
// app.get('/ingredients', cocktailController.getIngredients);

// POST Routes
// app.post('/ingredients', cocktailController.checkIngredients);

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
