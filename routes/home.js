const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    setTimeout(() => {
        fs.readFile('./json/products.json', { encoding: 'utf8' }, function(err, data) {
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
        });
    }, 0)
})

module.exports = router;