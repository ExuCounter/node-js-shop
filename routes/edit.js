const express = require('express');
const router = express.Router();

router.get('/edit', (req, res) => {
    res.render('index', {
        edit: true
    });
})

module.exports = router;