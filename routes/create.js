const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
const helpers = require('../helpers/index');
const { updateImage } = require('../helpers/updateImage');
const router = express.Router();

const storeFiles = multer({
    dest: './public/images/products'
})

router.get('/create', (req, res) => {
    res.render('index', {
        create: true
    });
})

router.post('/create', storeFiles.single('productImage'), (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let productId = shortid.generate();

    let product = {
        id: productId,
        image: updateImage(req, res, productId),
        name: req.body.productName,
        price: req.body.productPrice,
        currency: req.body.productCurrency
    }

    // Update JSON Products file
    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err || !data) {
            console.log(data);
            let products = {
                table: []
            };
            products.table.push(product);
            let json = JSON.stringify(products);
            fs.writeFileSync('./json/products.json', json, 'utf-8', err => {
                if (err) throw err;
            })
        } else {
            fs.readFile('./json/products.json', 'utf-8', (err, data) => {
                if (err) throw err;
                console.log(data);
                let products = JSON.parse(data);
                products.table.push(product);
                let json = JSON.stringify(products);
                fs.writeFileSync('./json/products.json', json, 'utf-8', err => {
                    if (err) throw err;
                })
            })
        }
    })
    res.redirect(301, '/');
})

module.exports = router;