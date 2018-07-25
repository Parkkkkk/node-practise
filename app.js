var express = require('express');
var app = express();
app.locals.pretty = true;
app.set('view engine' , 'jade');
app.set('views', './views')
app.use(express.static('public'));  
// public이라는 디렉터리에 정적인 파일을 갔다놓으면 
//그 정적인 파일을 사용자에게 서비스 할수있다.

app.get('/topic/:id' , function(req, res){
	var topics = [
		'Javascript is...',
		'Nodejs is ...',
		'Express is...'
		];
	var output = `
		<a href = "/topic?id=0">Javascript</a><br>
		<a href = "/topic?id=1">Nodejs</a><br>
		<a href = "/topic?id=2">Express</a><br>
		${topics[req.params.id]}
	`
	res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
	res.send(req.params.id + req.params.mode);
});
// topic/1/edit를 실행했을경우 edit는 mode에서 받아온다.

app.get('/template' , function(req,res){
	res.render('temp', {time:Date(), _title:'Jade'});
});

app.get('/' , function(req , res) {
	res.send('Hello hame page');
});

app.get('/dynamic' , function(req,res){
	//변수 선언후 ${}안에 변수를 넣어줌으로써 쉽게 코드에 
	//변수를 넣어 줄 수 있다.
	var lis = '';
	for(var i = 0; i<5 ; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	//원래 코드를 넣을수 없지만 ``를 통해서 긴 코드도 삽입이가능하다 
	var output = `<!DOCTYPE html> 
<html>
<head>
	<title></title>
</head>
<body>
	Hello Static!~~
	<ul>
	${lis}   
	</ul>
	${time}
</body>
</html>`
	res.send(output)
});

app.get('/route', function(req,res) {
	res.send('Hello Router, <img src = "/img.png">')
});


app.get('/login' , function(req, res) {
	res.send('Login please');
});

app.listen(3000, function(){
	console.log('Conneted 3000 port!');
});

