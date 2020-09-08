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
        setTimeout(() => {
            res.render('index', {
                edit: true,
                product: selectedProduct
            });
        })

        // fs.writeFileSync('./json/product.json', 'utf-8',)
    })
})

router.post('/edit', (req, res) => {

})

module.exports = router;