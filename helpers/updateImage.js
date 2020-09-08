const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports.updateImage = function(req, res, productId) {
    const tempImagePath = req.file.path;
    const imagePath = path.join(__dirname, '../', `/public/images/products/${productId+'.'+req.file.mimetype.substr(6)}`);
    let imagePathBase = path.basename(imagePath);

    console.log(imagePathBase);

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
    return imagePathBase;
}