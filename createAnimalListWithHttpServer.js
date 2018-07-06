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
