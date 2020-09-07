const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storeFiles = multer({
    dest: './images/uploads'
})

router.get('/create', (req, res) => {
    res.render('index', {
        create: true
    });
})

router.post('/create', storeFiles.single('productImage'), (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(JSON.stringify(req.file));
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        const tempPath = req.file.path;
        const newPath = path.join(__dirname, '../', '/images/uploads/image.png');

        fs.rename(tempPath, newPath, err => {
            if (err) {
                res
                    .status(500)
                    .contentType("text/plain")
                    .end("Oops! Something went wrong!");
            } else {
                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            }
        })
    }
})

router.post('/create', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    let product = {
        image: req.body.productImage,
        name: req.body.productName,
        price: req.body.productPrice
    }
    fs.readFile('./json/products.json', 'utf-8', (err, data) => {
        if (err || !data) {
            console.log(data);
            let products = {
                table: []
            };
            products.table.push(product);
            let json = JSON.stringify(products);
            fs.writeFile('./json/products.json', json, 'utf-8', err => {
                if (err) throw err;
            })
        } else {
            fs.readFile('./json/products.json', 'utf-8', (err, data) => {
                if (err) throw err;
                console.log(data);
                let products = JSON.parse(data);
                products.table.push(product);
                let json = JSON.stringify(products);
                fs.writeFile('./json/products.json', json, 'utf-8', err => {
                    if (err) throw err;
                })
            })
        }
    })
    res.redirect(302, '/');
})

module.exports = router;