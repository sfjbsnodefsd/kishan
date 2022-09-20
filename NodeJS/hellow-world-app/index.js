//console.log("Hello this is Kishan");
const http = require('http');

function greet(req,res){
    res.write("<h1>Hey this is Kishan. There am i </h1>");
    res.end();
}

http.createServer(greet).listen(3000);
