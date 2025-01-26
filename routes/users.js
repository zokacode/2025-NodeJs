var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:name', function(req, res, next) {
  let name = req.params.name || "未找到名字";
  let limit = Number(req.query.limit) || 0;
  let editUrl = `/users/${encodeURIComponent(name)}/edit`;
  res.status(200).render('users/personal', { title: 'Users', name, limit, editUrl });
});

router.get('/:name/edit', function(req, res, next) {
  let name = req.params.name || "未找到名字";
  let editUrl = `/users/${encodeURIComponent(name)}/edit`;
  res.status(200).render('users/personal_edit', { title: 'Users Edit', name, editUrl });
});

router.post('/:name/edit', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.name);
  res.status(200).send('test');
});

module.exports = router;
