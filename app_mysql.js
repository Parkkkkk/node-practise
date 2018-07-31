//간단한 웹어플리케이션 제작
//좋지않은 방법이지만 이해만 해보자

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.diskStorage ({
	destination : function (req , file , cd) {
		cd(null, 'uploads/')
	},
	filename : function(req, file, cd ) {
		cd(null, file.originalname)
	}
})
var upload = multer({ storage : storage})

var fs = require('fs');

var mysql 	= require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  port: '3307',
  database : 'o2'
});

conn.connect();


var app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;
//Jade태그의 줄바꿈을 도와준다.
app.use('/user', express.static('uploads'));
//사용자에게 이미지를 보여주고싶다면 !
app.set('views' , './views_mysql');    
//템플릿 파일을 views_file에 저장
app.set('view engine' , 'jade');
//템플릿 엔진은 jade

app.get('/upload' , function (req, res){
	res.render('upload');
})

app.post('/upload',upload.single('userfile'), function(req , res){
	console.log(req.file);
	res.send('Uploaded : ' + req.file.filename);
})

app.get('/topic/add', function (req, res){
	var sql = 'SELECT id,title FROM topic';
	conn.query(sql, function ( err , rows , fields){
		if(err){
			console.log(err)
			res.status(500).send('Internal Server Error');
		}
		res.render('add',{topics: rows});
	});
});

//POST방식으로 전달받은 데이터
app.post('/topic/add' , function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.author;
	var sql = 'INSERT INTO topic (title,description,author) VALUES(?, ?, ?)';
	conn.query(sql, [title,description,author] , function(err, result , fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		} else {
			res.redirect('/topic/' + result.insertId);
		}
		});
});
	
// EDIT 라우트
app.get(['/topic/:id/edit'] , function(req, res){
		var sql = 'SELECT id,title FROM topic';
		conn.query(sql, function ( err , rows , fields){
			var id = req.params.id;
			if(id){ //아이디 값이있으면 내용 상세보기
				var sql = 'SELECT * FROM topic WHERE id=?';
				conn.query(sql,[id],function( err, topics, fields){
					if(err){
						console.log(err);
						res.status(500).send('Internal Server Error');
					} else {
						res.render('edit' , {topics:rows , topic : topics[0]});		
					}
				});
			} else { // id값이 존재하지 않는데 edit페이지로 이동하면 안됨 !
				console.log('There is no id.');
				res.status(500).send('Internal Server Error');
			}
			
		});
});

//페이지 수정 정보 post방식으로 전달
app.post(['/topic/:id/edit'] , function(req, res){
	var titlt = req.body.title;
	var description = req.body.description;
	var author = req.body.author;
	var id = req.params.id;
	var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
	conn.query(sql, [title, description,author,id], function( err, result, fields){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		} else {
			res.redirect('/topic/'+id);
		}
	});
});

//DELETE 부분
app.get('/topic/:id/delete' , function ( req, res){
	var sql = 'SELECT id,title FROM topic';
	var id = req.params.id;
	conn.query(sql, function ( err , rows , fields){
			var sql = 'SELECT * FROM topic WHERE id=?'
			conn.query(sql, [id], function ( err, srows){
				if(err){
						console.log(err);
						res.status(500).send('Internal Server Error');
					} else {
						if(srows.length === 0 ){
							console.log('There is no to record.');
							res.status(500).send('Internal Server Error');
						} else {
							res.render('delete', {topics:rows , topic:srows[0]});
						}
					}
			})
	});
});

//DELETE 구현
app.post('/topic/:id/delete' , function ( req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM topic WHERE id=?';
	conn.query(sql, [id], function (err, result){
		res.redirect('/topic/');
	});
});

app.get(['/topic','/topic/:id'] , function(req, res){
		var sql = 'SELECT id,title FROM topic';
		conn.query(sql, function ( err , rows , fields){
			var id = req.params.id;
			if(id){ //아이디 값이있으면 내용 상세보기
				var sql = 'SELECT * FROM topic WHERE id=?';
				conn.query(sql,[id],function( err, topics, fields){
					if(err){
						console.log(err);
						res.status(500).send('Internal Server Error');
					} else {
						res.render('view' , {topics:rows , topic : topics[0]});		
					}
				});
			} else {
				res.render('view' , {topics:rows});
			}
			
		});
});
/*
app.get('/topic/:id', function( req, res){
	var id = req.params.id;
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		fs.readFile('data/'+id, 'utf8',function(err, data){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('view',{topics:files, title:id , description: data});
		})
	})
})
*/


app.listen(3000, function (){
	console.log('Connected, 3000 Port!');
})

