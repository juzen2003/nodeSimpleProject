const fs = require('fs');

// read file from animals.txt at the same directory
fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(data);
});

// error message if it's reading from a non-existing file
// yjchang (master *) node_first_project $ node animal_fun.js
// { Error: ENOENT: no such file or directory, open './animal.txt'
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: './animal.txt' }

// write to (and create) example.txt, callback only takes in error as argument
fs.writeFile('./example.txt', 'I will be written to example.txt', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("file successfully written!");
});
