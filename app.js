var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine' , 'jade');
app.set('views', './views')
app.use(express.static('public'));  
// public이라는 디렉터리에 정적인 파일을 갔다놓으면 
//그 정적인 파일을 사용자에게 서비스 할수있다.
app.use(bodyParser.urlencoded({ extended : false}));
// 미들웨어를 먼저 통과한 다음에 라우트가 동작하게 된다.

app.get('/form' , function (req, res){
	res.render('form');
});
// jade는 랜더링방식으로

app.get('/form_receiver' , function(req, res){
	var title = req.query.title;
	var description = req.query.description;
	res.send(title + ',' +description);
});
//GET방식

app.post('/form_receiver', function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	res.send(title + ',' + description);
});
//POST방식

app.get('/topic/:id' , function(req, res){
	var topics = [
		'Javascript is...',
		'Nodejs is ...',
		'Express is...'
		];
	var output = `
		<a href = "/topic/0">Javascript</a><br>
		<a href = "/topic/1">Nodejs</a><br>
		<a href = "/topic/2">Express</a><br>
		${topics[req.params.id]}
	`
	res.send(output);
});

// 사용자가 topic?id=1 이 아닌
// topic/1로 접근했을때 id=1이라는 것을 인식하여 응답하는법
// 시멘틱 웹

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

	var lis = '';
	for(var i = 0; i<5 ; i++){
		lis = lis + '<li>coding</li>';
	}
	var time = Date();
	
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

//원래 코드를 넣을수 없지만 ``를 통해서 긴 코드도 삽입이가능하다 
//변수 선언후 ${}안에 변수를 넣어줌으로써 쉽게 코드에 
//변수를 넣어 줄 수 있다.


app.get('/route', function(req,res) {
	res.send('Hello Router, <img src = "/img.png">')
});

//route로 접근했을때 image와 같이 보여주는 방법

app.get('/login' , function(req, res) {
	res.send('Login please');
});

//사용자가 login으로 접근했을때의 응답

app.listen(3000, function(){
	console.log('Conneted 3000 port!');
});

// 연결