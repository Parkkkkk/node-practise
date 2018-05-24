var _ = require('underscore');  //언더스코어 모듈을 가져와서 그 객체를 리턴한다.
var arr = [3,6,9,1,12];

console.log(arr[0]);
console.log(_.first(arr));
console.log(arr[arr.length-1]); //마지막 원소가 나온다.
console.log(_.last(arr));