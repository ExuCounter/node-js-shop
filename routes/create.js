const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/create', (req, res) => {
    res.render('index', {
        create: true
    });
})

router.post('/create', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let product = {
        image: req.body.productImage,
        name: req.body.productName,
        price: req.body.productPrice
    }
    fs.access('./json/products.json', fs.F_OK, err => {
        if (err) {
            let products = {
                table: []
            };
            products.table.push(product);
            let json = JSON.stringify(products);
            fs.writeFile('./json/products.json', json, 'utf-8', err => {
                if (err) throw err;
            })
        } else {
            let products = JSON.parse(data);
            products.table.push(product);
            let json = JSON.stringify(products);
            fs.writeFile('./json/products.json', json, 'utf-8', err => {
                if (err) throw err;
            })
        }
    })
    res.redirect(302, '/');
})

module.exports = router;