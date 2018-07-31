//실제로는 별도의 파일로 정보를 넣고 
//기밀성을 지켜야한다 

var mysql 	= require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  port: '3307',
  database : 'o2'
});

conn.connect();

/* SELECT 
var sql = 'SELECT * from topic';
conn.query(sql, function(err, rows, fileds){
	if(err){
		console.log(err);
	} else {
		for (var i=0 ; i<rows.length; i++){
			console.log(rows[i].title);
		}
	}
});
*/

/* INSERT
var sql = 'insert into topic ( title, description, author) values(?,?,?)';
var params = ['Supervisor' , 'Watcher','graphittie'];
conn.query(sql,params, function (err, rows, fileds){
	if(err){
		console.log(err);
	} else {
		console.log(rows.insertId);
	}
});
*/

/* UPDATE
var sql = 'update topic set title=?,author=? where id=?';
var params = ['NPM' , 'leezche',1];
conn.query(sql,params, function (err, rows, fileds){
	if(err){
		console.log(err);
	} else {
		console.log(rows);
	}
});
*/


var sql = 'delete from topic where id=?';
var params = [1];
conn.query(sql,params, function (err, rows, fileds){
	if(err){
		console.log(err);
	} else {
		console.log(rows);
	}
});
conn.end();