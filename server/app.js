// DO NOT EDIT - Initialize Express, handle JSON requests
const express = require('express');
const app = express();

app.use(express.json());

/**
 *  Basic Phase 1 - Plain-text response
 *     Method: GET
 *     Route: /version
 *     Response (Text): "1.0.0"
 */
// Your code here 

// Route to handle GET /version
app.get('/version', (req, res) => {
    res.status(200).type('text').send('1.0.0');
  });
  
/**
 *  Basic Phase 2 - Route param and JSON response
 *      Method: GET
 *      Route: /viewers
 *      Route Parameter: id
 *      Response (JSON): user object with id, first name, last name,
 *                birth date and list of favorite movies
 *          id - route parameter
 *          firstName - string
 *          lastName - string
 *          birthDate - date (format: MM/DD/YYYY)
 *          favoriteMovies - array of strings
 *
 *  Hint: Use your name, birth date and favorite movies (as strings in the code)
 *  combined with the id sent as a route parameter in the url
 */
// Your code here 

// Example users data
const users = {
    "1": {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      birthDate: "1990-01-01",
      favoriteMovies: ["Inception", "The Matrix"]
    },
    "UUID1": {
      id: "UUID1",
      firstName: "Jane",
      lastName: "Smith",
      birthDate: "1985-05-15",
      favoriteMovies: ["Avatar", "Titanic"]
    }
  };
  
  // Define the /viewers/:id route
  app.get('/viewers/:id', (req, res) => {
    const  userId = req.params.id;
    const user = users[userId];
  
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });

/** Basic Phase 3 - Query params in URL
 *      Method: GET
 *      Route: /info
 *      Request query parameters: message
 *      Response (Text): message query parameter reflected back to the user
 *      Error Handling: If "message" is missing from the query string,
 *                      then respond with the text "message required"
 *
 *      Sample routes:
 *          /info?message=Hello, world!
 *          /info?message=
 *          /info
 *      Sample responses, respectively (as seen in the browser):
 *          Hello, world!
 *          message required
 *          message required
 */
// Your code here 
// Define the /info route

app.get('/info', (req, res) => {
    const message = req.query.message;
  
    if (message && message.trim()) {
      res.status(200).set('Content-Type', 'text/plain').send(message);
    } else {
      res.status(200).set('Content-Type', 'text/plain').send('message required');
    }
  });
  
/**
 *  IMPORTANT: Scroll to the top for basic phases.
 *
 *  Do the basic phases first. You can return to the bonus phases later for
 *  extra practice during assessment preparation.
 */

/**
 *  Advanced Bonus Phase A - Respond with a JSON object using
 *                           values from the request object
 *      Method: POST
 *      Route: /movies
 *      Request (JSON): name, year, favorite
 *          name - string
 *          year - string of 4 digits
 *          favorite - string "on", or missing (if not favorite)
 *      Response (JSON):
 *          id - random integer
 *          name - string
 *          year - integer
 *          isFavorite - boolean
 *
 *      Sample request object:
 *          { "name": "Bash", "year": "2002", "favorite": "on" }
 *      Sample response object:
 *          { "id": 7884906, "name": "Bash", "year": 2002, "isFavorite": true }
 *
 *      Alternate request object:
 *          { "name": "Honey Sweet", "year": "1967" }
 *      Alternate response object:
 *          { "id": 98765432, "name": "Honey Sweet", "year": 1967, "isFavorite": false }
 */
// Your code here 

// Utility function to generate a random ID
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Define the /movies route
app.post('/movies', (req, res) => {
  const { name, year, favorite } = req.body;

  // Validate and parse year as a number
  const yearAsNumber = parseInt(year, 10);

  // Determine if "favorite" is present
  const isFavorite = favorite ? true : false;

  // Respond with the movie object, including a random id
  const movie = {
    id: generateRandomId(),
    name,
    year: yearAsNumber,
    isFavorite
  };

  res.status(200).json(movie);
});

/**
 *  Advanced Bonus Phase B - Research how to return static
 *                           files in a public folder
 *
 *      Use your researching skills, to figure out how to return files from
 *      a folder in your Express server.
 *
 *      If you get stuck, skip this. You will study this in more detail
 *      in a future lesson. You can come back while studying for the
 *      assessment and complete this phase for additional practice.
 *
 *      Reference: https://expressjs.com/en/starter/static-files.html
 *
 *      Test route: /logo.png
 */
// Your code here 

// Define the /logo.png route
const fs = require('fs');
const path = require('path');

app.get('/logo.png', (req, res) => {
    const logoPath = path.join(__dirname, 'public', 'logo.png');
  
    // Read the logo.png file from the filesystem
    fs.readFile(logoPath, (err, data) => {
      if (err) {
        return res.status(500).send('File not found');
      }
  
      // Set the content type and send the file data
      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(data);
    });
  });

// DO NOT EDIT - Set port and listener
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}
