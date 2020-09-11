const express = require('express');
const fs = require('fs');
const multer = require('multer');
const { updateImage } = require('../helpers/updateImage');
const router = express.Router();

const storeFiles = multer({
    dest: './public/images/products'
})

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
        res.render('index', {
            title: `Edit Product | ${selectedProduct.name}`,
            edit: true,
            product: selectedProduct
        });
        // fs.writeFileSync('./json/product.json', 'utf-8',)
    })
})

router.post('/', storeFiles.single('productImage'), (req, res) => {
    if (!req.body) return res.sendStatus(400);
    fs.readFile('./json/products.json', (err, data) => {
        if (err) console.log(err);
        let products = JSON.parse(data);
        products.table = products.table.map(product => {
            return product.id == req.body.productId ? {
                id: req.body.productId,
                name: req.body.productName,
                price: req.body.productPrice,
                currency: req.body.productCurrency,
                image: req.file == undefined ? req.body.productImagePrevious : updateImage(req, res, req.body.productId)
            } : product;
        })
        fs.writeFile('./json/products.json', JSON.stringify(products), 'utf-8', err => {
            if (err) throw err;
            res.redirect(302, `/view/${req.body.productId}`);
        })
    })
})

module.exports = router;