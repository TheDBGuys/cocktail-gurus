const pool = require('../models/database');

/** The getRecipes method works with the GET /recipes route.
 *  The method queries the database for recipes and constructs
 *  an array of recipe objects which is returned as JSON in the response
 * */
async function getRecipes (req, res) {
  const recipeArray = [];

  // Defining the necessary queries
  const queryFindAll = 'SELECT * FROM Recipes';
  const queryFindInstructions = 'SELECT * FROM Instructions';
  const queryFindIngredients = `SELECT ri.r_id, i.i_name, ri.amount 
    FROM Recipe_Ingredient as ri 
    INNER JOIN Ingredients as i ON ri.i_id = i.id
    INNER JOIN Recipes as r ON ri.r_id = r.id WHERE 1=1`;

  // Defining variables for the query results
  let findAllResponse;
  let findInstructionsResponse;
  let findIngredientsResponse;

  // Executing each database query asynchronously and storing results
  try {
    findAllResponse = await pool.query(queryFindAll);
    findInstructionsResponse = await pool.query(queryFindInstructions);
    findIngredientsResponse = await pool.query(queryFindIngredients);
  } catch (error) {
    console.log(error);
  }
  // Contructing the recipe objects and pushing to the recipe array
  for (let i = 0; i < findAllResponse.length; i += 1) {
    const recipeObj = {
      id: findAllResponse[i].id,
      name: findAllResponse[i].r_name,
      description: findAllResponse[i].r_description,
      picture: findAllResponse[i].r_pic_url,
      ingredients: [],
      amounts: [],
      steps: []
    };
    recipeArray.push(recipeObj);
  }

  // Adding the instructions to the recipe objects
  for (let i = 0; i < findInstructionsResponse.length; i += 1) {
    for (let x = 0; x < recipeArray.length; x += 1) {
      if (findInstructionsResponse[i].r_id === recipeArray[x].id) {
        recipeArray[x].steps.push(findInstructionsResponse[i].steps_direction);
      }
    }
  }

  // Adding the ingredients to the recipe objects
  for (let i = 0; i < findIngredientsResponse.length; i += 1) {
    for (let x = 0; x < recipeArray.length; x += 1) {
      if (findIngredientsResponse[i].r_id === recipeArray[x].id) {
        recipeArray[x].ingredients.push(findIngredientsResponse[i].i_name);
        recipeArray[x].amounts.push(findIngredientsResponse[i].amount);
      }
    }
  }
  // Returning the recipe array
  res.send(recipeArray);
}

module.exports = { getRecipes };
