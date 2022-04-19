// Sets up our required dependencies.
const express = require("express");
const mysql = require("mysql2");
// Setup our PORT.
const PORT = process.env.PORT || 3001;
// Simplifies using express by assinging to const.
const app = express();

// Middleware to parse express as json.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Creates connection to our SQL database.
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "A$pdmjlm1",
    database: "movie_db",
  },
  console.log(`Connected to the movie_db database.`)
);

// Shows all movies
app.get("/api/movies", (req, res) => {
  db.query("SELECT * FROM movies", function (err, results) {
    console.log(results);
    res.json(results);
  });
});

app.post("/api/add-movie", (req, res) => {
      
    let movie = `The Godfather`;
    console.log(movie);
    db.query("INSERT INTO movies (name) VALUES ('Company Inc', 'Highway 37')", function (err, results) {
      if (err) throw err;
      console.log("Number of records inserted: " + results.affectedRows);
      res.json(results)
    });
});

// Returns 404 for a query failure.
app.use((req, res) => {
  res.status(404).end();
});

// Tells server to listen on our predefined PORT.
app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
