const http = require('http');
const qs = require('querystring');
const https = require('https');
const fs = require('fs');

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
      res.end(username);

    });
  } else {
    res.end("Not a POST request!");
  }
});

// http://localhost:8080
githubServer.listen(8080, () => {
  console.log('Listening on 8080!');
});
