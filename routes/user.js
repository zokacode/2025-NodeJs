let express = require('express');
let router = express.Router();

router.get('/:name', function (req, res) {
    let name = req.params.name;
    res.status(200)
        .type('text/html')
        .send(`<h1>Hello ${name}!</h1>`);
});

module.exports = router;