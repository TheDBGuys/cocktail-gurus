const db = require('../models/database');

function getCocktails(req, res) {
  console.log('Starting query...');
  db.query('SELECT * FROM cocktails', (err, results) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
}

module.exports = { getCocktails };
