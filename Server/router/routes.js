const express = require('express');
const { getServer } = require('../Controller/controller');
const router = express.Router();
router.get('/', getServer)

module.exports = router;
