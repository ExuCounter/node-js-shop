const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    let products = fs.readFileSync('./json/products.json', 'utf-8');
    products = JSON.parse(products);
    if (products.table.length == 0) {
        console.log('No Products yet');

        res.render('index', {
            title: 'Products',
            home: true,
            void: true
        });
    } else {
        products.table.map(product => {
            product.price = new Intl.NumberFormat('en-US', { style: 'currency', currency: `${product.currency.toUpperCase()}` }).format(product.price);
        })
        res.render('index', {
            title: 'Products',
            void: false,
            home: true,
            products: products.table
        });
    }
})

module.exports = router;