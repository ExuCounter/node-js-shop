const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/view/:id', (req, res) => {
    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
    })
    res.render('index', {
        view: true
    });
})

module.exports = router;