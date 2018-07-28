//간단한 웹어플리케이션 제작
//좋지않은 방법이지만 이해만 해보자

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest: 'uploads/'})
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;
//Jade태그의 줄바꿈을 도와준다.
app.set('views' , './views_file');    
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

app.get('/topic/new', function (req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new',{topics:files});
	})
})

app.get(['/topic','/topic/:id'] , function(req, res){
	fs.readdir('data', function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		var id = req.params.id;
		if(id) {
		//id값이 있을때
			fs.readFile('data/'+id, 'utf8',function(err, data){
				if(err)
				{
					console.log(err);
					res.status(500).send('Internal Server Error');
				}
				res.render('view',{topics:files, title:id , description: data});
			})
		} else {
			//id값이 없을 때
			res.render('view', {topics : files, title:'Wercome', description:'Hello, JavaScript'});
		}
	})
	
})
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

app.post('/topic' , function(req, res){
	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data/'+title,description, function(err){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/' + title);	
	});
});

app.listen(3000, function (){
	console.log('Connected, 3000 Port!');
})

