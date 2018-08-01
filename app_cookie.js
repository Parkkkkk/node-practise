//쿠키에 관한 개념을 이해하기위해
//다른 내용은 배제한 내용 

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
//cookieParser에 인자값을 주면 키값이된다. 
app.use(cookieParser(''));

//데이터베이스 대체 
var products = {
	1:{title:'The history of web 1'},
	2:{title:'The next web'}
};

app.get('/products', function(req, res){
	var output = '';
	for(var name in products) {
		output += `
		<li>
			<a href="/cart/${name}">${products[name].title}
		</li>`
	}
	res.send(`<h1>Products</h1><ul>${output}</ul><a href = "/cart">Cart</a>`);
});

app.get('/cart/:id', function(req, res){
	var id = req.params.id;
	if(req.signedCookies.cart){
		var cart = req.signedCookies.cart;
	} else { //최초 실행의 경우 생성
		var cart = {};	
	}
	if(!cart[id]){
		cart[id] = 0;
	}
  cart[id] = parseInt(cart[id])+1;  //쿠키로 전달되면 문자열이기때문에 int형으로 변환 
	res.cookie('cart', cart , {signed:true});  //쿠키로 셋팅
	res.redirect('/cart');
});

app.get ('/cart' , function (req, res){
	var cart = req.signedCookies.cart;
	if(!cart) {
		res.send('Empty!');
	} else {
		var output= '';
		for(var id in cart){
			output += `<li>${products[id].title} (${cart[id]})</li>`;
		}
	}
	res.send(`
		<h1>Cart</h1>
		<ul>${output}</ul>
		<a href="/products">Products List</a>
		`);
})

app.get('/count', function(req, res){
	//signedCookies를 이용한 암호화
	//키값으로 풀어주면 해당값을 알수있다.
	if(req.signedCookies.count){
		var count = parseInt(req.signedCookies.count);
	} else {
		var count = 0;
	}
	count = count + 1;
	res.cookie('count', count,{signed:true});
	res.send('count : ' + count);
});

app.listen(3000, function (){
	console.log('Connected 3000 port!!!');
});

