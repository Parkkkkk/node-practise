// 동기와 비동기

var fs = require('fs');

//동기방식
console.log(1);
var data = fs.readFileSync('data.txt',{encoding : 'utf8'});  //data.txt내용을 utf8방식으로 읽어올것이다.
console.log(data);
//Sync 동기는 readFile이 실행이 완료되어야 마지막 console 이 출력된다.




//비동기방식
console.log(2);
fs.readFile('data.txt', {encoding : 'utf8'}, function (err, data) {
	console.log(3);
	console.log(data);
})

console.log(4);

//Async  (실행 순서가 2,4,3,data 순으로 이루어지는데 비동기는 백그라운드에서 이루어진다고 생각하면된다
//readFile이 다 읽어져야 function 이 읽어진다.
