const express = require('express')
const router = express.Router()
const request = require('request');

router.get('/', function(req, res, next) {
    request({
        uri: 'https://jsonplaceholder.typicode.com/users',
    }).pipe(res);
});

module.exports = router