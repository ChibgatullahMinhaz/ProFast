const express = require('express');
const { getServer } = require('../Controller/controller');
const { getDistance } = require('../Controller/googleApis');
const { applyGents, getAgentByEmail } = require('../Controller/agentController');
const { createUser, getUserRole, createParcels, getParcelsByEmail, deleteParcel } = require('../Controller/userController');
const router = express.Router();
router.get('/', getServer)

// google apis
router.get('/distance', getDistance),


    // admin apis


    // user apis 

    //post operation
    router.post("/users", createUser);
router.post("/parcels", createParcels);
router.delete("/parcels/:id", deleteParcel);

// get operation
router.get("/parcels", getParcelsByEmail);
router.get('/users/role', getUserRole);


// agent apis
router.post('/api/agents/apply', applyGents)
router.get("/agent-by-email", getAgentByEmail);

module.exports = router;
