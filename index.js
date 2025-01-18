let express = require('express');
let app = express();

let port = process.env.PORT || 3000;

console.log('Server is starting...');

// 增加靜態檔案
app.use(express.static('public'));
// 增加json解析
app.use(express.json());

// 使用Middleware，進行通用的處理
app.use((req, _res, next) => {
	console.log('Middleware 1 ');
    console.log(req.get('Referer'));
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

app.get('/json', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use((req, _res, next) => {
	console.log('假如有登入機制');
	next();
});
// 引入其他router
app.use('/user', require('./routers/user'));

// 404處理
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

app.listen(port, () => {
    console.log('Server is starting...' + process.env.NODE_ENV);
    console.log(`Server is running at port ${port}`);
});