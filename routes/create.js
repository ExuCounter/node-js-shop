const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
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

    const tempImagePath = req.file.path;
    const imagePath = path.join(__dirname, '../', `/public/images/products/${productId+'.'+req.file.mimetype.substr(6)}`);
    let imagePathBase = path.basename(imagePath);

    console.log(imagePathBase);

    // Change image location if its image ( not another .ext file/name ) //
    if (req.file.mimetype.startsWith('image') && (req.file.mimetype.endsWith('png') || req.file.mimetype.endsWith('jpg') || req.file.mimetype.endsWith('jpeg'))) {
        fs.rename(tempImagePath, imagePath, err => {
            if (err) throw err;
            console.log('Image upload successfull');
        })
    } else {
        fs.unlink(tempImagePath, err => {
            if (err) throw err;
        })
        var placeholderImage = fs.createReadStream(`./public/images/products/placeholder.jpg`);
        var productImage = fs.createWriteStream(`./public/images/products/${productId}.jpg`);

        placeholderImage.pipe(productImage);
        imagePathBase = `${productId}.jpg`;
    }
    let product = {
        id: productId,
        image: imagePathBase,
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