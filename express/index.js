var express = require('express');
var path = require('path');
var app = express();
//处理url请求
app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});
app.post('/', function (req, res) {
    res.send('Hello World');
});
//链式处理(类似于中间件的作用)
app.get('/recursive', function (req, res, next) {
    console.log('dealA');
    //next()函数用于将控制权转移给下一个处理句柄
    next();
}, function (req, res, next) {
    console.log('dealB');
    next();
}, [function (req, res, next) {
    console.log('dealC');
    next();
}, function (req, res, next) {
    console.log('dealD');
    res.send('response ok');
}]);
//路由分组
app.route('/book').get(function (req, res) {
        res.send('Get a random book');
    }).post(function (req, res) {
        res.send('Add a book');
    });
//如果所有请求都无法匹配，就返回404错误
app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
//错误捕获
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
//express处理静态资源中间件,public为静态资源文件所在的目录
app.use(express.static('public'));
var server = app.listen(3000, function () {
    console.log(arguments);
    console.log(server.address());
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port)
});