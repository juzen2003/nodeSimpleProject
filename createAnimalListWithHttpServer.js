// Let's handle two situations:

// No letter is passed to our server and we return the entire animals.txt file or
// A letter is passed to our server and we filter the animals starting wtih that letter.
//
// Check if the client passed a letter to your Node server as a query string
// Read the animals.txt file into memory
// If a letter was passed, select all animals that start with the provided letter
// Write the result in your response (Don't worry about valid HTML for now)

// Once you have that working, let's refactor a bit. As it stands, we're reading a file with every request but our server is running continuously. It would be better if we stored the contents of the file in memory and eliminated those unnecessary file reads.

// Try storing the file contents in a cache (a POJO will work just fine), and check with each request to see if we have the data already. We can expand this idea to store query results as well...

const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const cache = {};

// passed in letter in query string of url like: http://localhost:8000/?letter=z
const server = http.createServer((req, res) => {
  let queryStr = req.url.split('?')[1];
  // [ '/', 'letter=a' ]
  // [ '/favicon.ico' ]
  let passedLetter = qs.parse(queryStr).letter;

  if(queryStr !== undefined && passedLetter !== undefined) {
    let letter = passedLetter.toUpperCase();
    // { letter: 'a' }
    // {}
    // convert above to 'A'

    if(cache[letter] !== undefined) {
      res.end(cache[letter]);
    } else {
      if(letter !== undefined) {
        fs.readFile('./animals.txt', 'utf-8', (err, data) => {
          if(err) {
            res.end(err.message);
            return;
          } else {
            // data is a string separated by "\n"
            let selectedInfo = selectAnimals(data, letter);
            cache[letter] = selectedInfo;
            res.end(selectedInfo);
          }
        });
      }
    }
  } else {
    // no valid letter passed in in query string
    if(cache["animals"] !== undefined) {
      res.end(cache["animals"]);
    } else {
      fs.readFile('./animals.txt', 'utf-8', (err, data) => {
        if(err) {
          res.end(err.message);
          return;
        } else {
          // data is a string separated by "\n"
          cache["animals"] = data;
          res.end(data);
        }
      });
    }
  }
});


// find the animals that start with letter
const selectAnimals = function(data, letter) {
  let res = [];
  data.split("\n").forEach(el => {
    if(el[0] === letter) {
      res.push(el);
    }
  });

  return res.join("\n");
};

server.listen(8000, () => console.log("Listening to 8000!"));
