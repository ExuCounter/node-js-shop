const express = require('express');
const app = express();

const router = express.Router();

router.use(require('./edit'));
router.use(require('./create'));
router.use(require('./single'));
router.use(require('./home'));

module.exports = router;