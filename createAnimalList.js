const fs = require('fs');

let firstLetterFromArg = process.argv[2].toUpperCase();
let info = "";
let letterFile = `${firstLetterFromArg}_animals.txt`;

fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if(err) {
    console.log(err.message);
    return;
  } else {
    // data is a string separated by "\n"
    info = data;
    let selectedInfo = selectAnimals(info, firstLetterFromArg);
    writeToFile(selectedInfo);
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

// write the new animal info into new file
const writeToFile = function(data) {
  fs.writeFile(`./${letterFile}`, data, (err) => {
    if(err) {
      console.log(err.message);
    } else {
      console.log("write sucessfully!");
    }
  });
};
