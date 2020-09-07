const express = require('express');
const fs = require('fs');
const { data } = require('jquery');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        console.log(data.table);

        res.render('index', {
            home: true,
            products: data.table
        });
    })
})

module.exports = router;