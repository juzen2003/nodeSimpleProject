const fs = require('fs');
const http = require('http');
const qs = require('querystring');
const cache = {};

// read file from animals.txt at the same directory
// fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//   if (err) {
//     console.log(err.message);
//     return;
//   }
//   console.log(data);
// });

// error message if it's reading from a non-existing file
// yjchang (master *) node_first_project $ node animal_fun.js
// { Error: ENOENT: no such file or directory, open './animal.txt'
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: './animal.txt' }

// write to (and create) example.txt, callback only takes in error as argument
// fs.writeFile('./example.txt', 'I will be written to example.txt', err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log("file successfully written!");
// });
//
// console.log(process.argv);

// const server = http.createServer((req, res) => {
//   let queryStr = req.url.split('?')[1];
//   let passedLetter = qs.parse(queryStr).letter;
//   // [ '/', 'letter=a' ]
//   // [ '/favicon.ico' ]
//   if(queryStr !== undefined && passedLetter !== undefined) {
//     let letter = passedLetter.toUpperCase();
//     // { letter: 'a' }
//     // {}
//     // convert above to 'A'
//
//     if(cache[letter] !== undefined) {
//       res.end(cache[letter]);
//     } else {
//       if(letter !== undefined) {
//         fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//           if(err) {
//             res.end(err.message);
//             return;
//           } else {
//             // data is a string separated by "\n"
//             let selectedInfo = selectAnimals(data, letter);
//             cache[letter] = selectedInfo;
//             res.end(selectedInfo);
//           }
//         });
//       }
//     }
//   } else {
//     // no letter passed in in query string
//     if(cache["animals"] !== undefined) {
//       res.end(cache["animals"]);
//     } else {
//       fs.readFile('./animals.txt', 'utf-8', (err, data) => {
//         if(err) {
//           res.end(err.message);
//           return;
//         } else {
//           // data is a string separated by "\n"
//           cache["animals"] = data;
//           res.end(data);
//         }
//       });
//     }
//   }
// });
//
//
// // find the animals that start with letter
// const selectAnimals = function(data, letter) {
//   let res = [];
//   data.split("\n").forEach(el => {
//     if(el[0] === letter) {
//       res.push(el);
//     }
//   });
//
//   return res.join("\n");
// };
//
// server.listen(8000, () => console.log("Listening to 8000!"));
