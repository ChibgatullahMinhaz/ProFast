const express = require('express');
const { getServer } = require('../Controller/controller');
const { getDistance } = require('../Controller/googleApis');
const router = express.Router();
router.get('/', getServer)

// google apis
router.get('/distance', getDistance),




module.exports = router;
