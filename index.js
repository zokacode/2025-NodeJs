let express = require('express');
let app = express();

let user = require('./routes/user');
const port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    console.log("Middleware url: " + req.url);
    next();
});

app.get('/', function (req, res) {
    res.status(200)
        .type('text/html')
        .send('<h1>Hello World!</h1>');
});

app.get('/today', function (req, res) {
    let now = new Date();
    let today = req.query.today;
    let str = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    res.status(200)
       .type('text/plain')
       .send(str + "\r\n" + "Date: " + today); 
});

app.get('/json', function (req, res) {
    res.status(200)
        .type('application/json')
        .send(JSON.stringify({
            "hello": 'world',
            "foo": 'bar',
        }));
});

// 引入其他route
app.use('/user', user);

// 設定無路由時 404
app.use(function (req, res, next) {
    res.status(404)
        .type('text/html')
        .send('<h1>404 Not Found</h1>');
});

app.listen(port, function () {
    console.log(process.env.NODE_ENV);
    console.log(`Example app listening on port ${port}!`);
});