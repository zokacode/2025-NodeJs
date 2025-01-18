let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send(`<h1>Hello User</h1><br/><a href="/">home</a>`);
});

router.get('/:name', (req, res) => {
    // console.log(req.params);
    // console.log(req.query);
    let name = req.params.name;
    let limit = req.query.limit ?? 0;
    res.status(200).send(`<h1>Welcome ${name}</h1><br/>想查詢${limit}筆資料`);
});

router.post('/edit', (req, res) => {
    console.log(req.body);
    // 回傳 JSON 資料並設定 HTTP 狀態碼
    res.status(200).json({
        message: 'User edited successfully',
        data: req.body
    });
});

module.exports = router;