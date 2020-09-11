const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect(301, '/');
})

router.get('/:id', (req, res) => {
    let id = req.params['id'];

    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let products = JSON.parse(data);
        let selectedProduct = products.table.find(product => {
            return product.id === id;
        })
        selectedProduct.price = new Intl.NumberFormat('en-US', { style: 'currency', currency: `${selectedProduct.currency.toUpperCase()}` }).format(selectedProduct.price);
        res.render('index', {
            title: selectedProduct.name + ' | View',
            single: true,
            product: selectedProduct
        });
    })
})

router.post('/delete/:id', (req, res) => {
    if (!!req.body) {
        fs.readFile('./json/products.json', 'utf-8', (err, data) => {
            if (err) throw err;
            data = JSON.parse(data);
            data.table.map((product, index) => {
                if (product.id == req.params['id']) {
                    data.table.splice(index, 1)
                }
            })
            fs.writeFile('./json/products.json', JSON.stringify(data), err => {
                if (err) throw err;
                res.redirect(301, '/');
            })
        })
    }
})

module.exports = router;