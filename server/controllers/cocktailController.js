const db = require('../models/database');

function getRecipes(req, res) {
  // Declaring recipe array to store all recipe objects
  const recipeArray = [];

  // Query string to get all recipes
  const queryString1 = 'SELECT * FROM Recipes';
  const queryString2 = 'SELECT * FROM Instructions';
  const queryString3 = 'SELECT ri.r_id, i.i_name, ri.amount FROM Recipe_Ingredient as ri INNER JOIN Ingredients as i ON ri.i_id = i.id INNER JOIN Recipes as r ON ri.r_id = r.id WHERE 1=1';

  // Initial query to get all data from recipe table
  db.query(queryString1, (err, results) => {
    // Handling query errors
    if (err) { console.log(err); }

    // Iterating through results array and creating recipe objects
    for (let i = 0; i < results.length; i += 1) {
      const recipeObj = {
        id: results[i].id,
        name: results[i].r_name,
        description: results[i].r_description,
        picture: results[i].r_pic_url,
        ingredients: [],
        amounts: [],
        steps: []
      };
      // Push recipe object to recipe array
      recipeArray.push(recipeObj);
    }
    // console.log(recipeArray);
  });

  db.query(queryString2, (err2, results2) => {
    for (let i = 0; i < results2.length; i += 1) {
      for (let x = 0; x < recipeArray.length; x += 1) {
        if (results2[i].r_id === recipeArray[x].id) {
          recipeArray[x].steps.push(results2[i].steps_direction);
        }
      }
    }
  });
  db.query(queryString3, (err3, results3) => {
    for (let i = 0; i < results3.length; i += 1) {
      for (let x = 0; x < recipeArray.length; x += 1) {
        if (results3[i].r_id === recipeArray[x].id) {
          recipeArray[x].ingredients.push(results3[i].i_name);
          recipeArray[x].amounts.push(results3[i].amount);
        }
      }
    }
    res.send(recipeArray);
  });
}

// /**
//  * Controller method for the GET request /ingredients route
//  * Queries the RDS/MySQL database go all ingredients
//  *
//  * @returns {json} - the response will include all the ingredients in the database
//  */
// function getIngredients(req, res) {
//   console.log('Starting query...');
//   const queryString = 'SELECT * FROM Ingredients';
//   db.query(queryString, (err, results) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(results);
//     res.send(results);
//   });
// }

// /**
//  * Controller method for the POST request /ingredients route
//  * Queries the RDS/MySQL database with the passed ingredients
//  *
//  * @param {array} req.body - req.body will contain an array of the passsed ingredients
//  * @returns {json} - the response will include all the recipes that contain the passed ingredients
//  */
// function checkIngredients(req, res) {
//   console.log('Starting query...');
//   const { ingredients } = req.body;
//   const queryValues = [...ingredients];
//   console.log(queryValues);
//   const queryString = 'Add nifty query string here...';
//   res.send(ingredients);
// }

module.exports = { getRecipes };
