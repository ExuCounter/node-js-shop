const express = require('express');
const app = express();

const router = express.Router();


router.use(require('./create'));
router.use(require('./home'));
router.use('/edit', require('./edit'));
router.use('/view', require('./single'));

module.exports = router;