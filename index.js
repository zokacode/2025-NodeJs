let express = require('express');
let app = express();
let user = require('./routes/user');
const port = process.env.PORT || 3000;

console.log('Server is starting...');

// 增加靜態檔案
app.use(express.static('public'));
// 增加json解析
app.use(express.json());

// Middleware，通用的處理
app.use(function (req, _res, next) {
    console.log("Middleware url: " + req.url);
    // console.log(req.get('Referer'));
    next();
});

// 首頁
app.get('/', (_req, res) => {
    res.send(`
        <h1>Hello World</h1>
        <br/><a href="/user">User</a>
        <br/><a href="/test">test</a>
    `);
});

app.get('/today', function (req, res) {
    let now = new Date();
    let today = req.query.today;
    let str = `${now.toISOString().split('T')[0]} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    res.status(200)
        .type('text/plain')
        .send(str + "\r\n" + "Date: " + today); 
});

app.get('/json', function (_req, res) {
    res.status(200)
        .type('application/json')
        .send(JSON.stringify({
            "status": 200,
            "message": 'hello world',
        }));
});

app.use((_req, _res, next) => {
	console.log('假如有登入機制');
	next();
});

// 引入其他route
app.use('/user', user);

// 設定無路由時 404
app.use((req, res, _next) => {
    const referer = req.get('Referer') || '/';
    res.status(404).send(`
        <h1>404 Not Found</h1>
        <p>頁面將在3秒後自動跳轉到上一頁...</p>
        <meta http-equiv="refresh" content="3;url=${referer}">
    `);
});

// error處理
app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).send(`
        <h1>500 Code Error</h1>
        <p>頁面將在3秒後自動跳轉到上一頁...</p>
        <script>
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        </script>
    `);
});

app.listen(port, function () {
    console.log('Server is starting...' + process.env.NODE_ENV);
    console.log(`Server is running at port ${port}`);
});