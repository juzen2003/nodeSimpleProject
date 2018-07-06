// Make a request to the Github API to retrieve the user's starred repos
// In the request callback:
// Listen for data and end events and handle appropriately
// Select the fields you want to write, I picked 'name' and 'stargazers_count'
// Write to a file either using createWriteStream or writeFile
// End the original http.Response object with the contents of the file

const http = require('http');
const qs = require('querystring');
const https = require('https');
const fs = require('fs');

// const githubServer = http.createServer((req, res) => {
//   if(req.method === 'POST') {
//     // res.end("this is a POST request!");
//     let body = "";
//     req.on("data", d => {
//       // add listener to data event, d is an instance of Buffer
//       // toString is implicitly called when we add it to body
//       body += d;
//       // console.log(`${body}`);
//     });
//
//     req.on("end", () => {
//       // qs.parse will give us an object to retrieve the value
//       let username = qs.parse(body).username;
//       // console.log(`${username}`);
//       res.end(username);
//
//     });
//   } else {
//     res.end("Not a POST request!");
//   }
// });

const getOptionObj = function(username) {
  return {
    // https://developer.github.com/v3/apps/
    hostname: 'api.github.com',
    path: `/users/${username}/starred`,
    // path: `/users/${username}/repos`,
    // this is required for github API, use your username or project name as the value
    headers: {
        'User-Agent': 'github-grabber'
    }
  };
};

const writeToFile = function(data, username) {
  fs.writeFile(`./${username}_starred_repo.txt`, data, (err) => {
    if(err) {
      console.log(err.message);
    } else {
      console.log("write sucessfully!");
    }
  });
};

const githubServer = http.createServer((req, res) => {
  if(req.method === 'POST') {
    // res.end("this is a POST request!");
    let body = "";
    req.on("data", d => {
      // add listener to data event, d is an instance of Buffer
      // toString is implicitly called when we add it to body
      body += d;
      // console.log(`${body}`);
    });

    req.on("end", () => {
      // qs.parse will give us an object to retrieve the value
      let username = qs.parse(body).username;
      // console.log(`${username}`);

      let optObj = getOptionObj(username);

      https.get(optObj, (getRes) => {
        let githubData = "";

        getRes.on("data", (d) => {
          githubData += d;
        });

        getRes.on("end", () => {
          let repoData = JSON.parse(githubData);
          let writtenData = repoData.map(repo => {
            return `REPO: ${repo.name}. STARS: ${repo.stargazers_count}`;
          }).join("\n");
          writeToFile(writtenData, username);
          res.end(writtenData);
        });

      });

    });
  } else {
    res.end("Not a POST request!");
  }
});

// http://localhost:8080
githubServer.listen(8080, () => {
  console.log('Listening on 8080!');
});
