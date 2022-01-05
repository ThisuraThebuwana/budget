const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', function(req, res, next) {
    request({
        uri: 'https://picsum.photos/v2/list?page=1&limit=10',
    }).pipe(res);
});

module.exports = router