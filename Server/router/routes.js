const express = require('express');
const { getServer } = require('../Controller/controller');
const { getDistance } = require('../Controller/googleApis');
const { applyGents, getAgentByEmail } = require('../Controller/agentController');
const router = express.Router();
router.get('/', getServer)

// google apis
router.get('/distance', getDistance),


    // admin apis


    // user apis 


    // agent apis
    router.post('/api/agents/apply', applyGents)
    router.get("/agent-by-email", getAgentByEmail);

module.exports = router;
