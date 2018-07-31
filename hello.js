const http = require('http');  //http 모듈을 require 해서 http변수에 저장

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*

var server = http.createServer(function (req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');	
});
server.listen(port, hostname, function () {
	console.log(`Server running at http://${hostname}:${port}/`);
});

*/