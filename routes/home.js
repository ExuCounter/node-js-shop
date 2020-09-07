const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err || !data) {
            console.log(err);

            res.render('index', {
                home: true,
                void: true
            });
        } else {
            data = JSON.parse(data);
            console.log(data.table);

            res.render('index', {
                void: false,
                home: true,
                products: data.table
            });
        }
    })
})

module.exports = router;