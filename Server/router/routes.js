const express = require('express');
const { getServer } = require('../Controller/controller');
const { getDistance } = require('../Controller/googleApis');
const { applyGents, getAgentByEmail } = require('../Controller/agentController');
const { createUser, getUserRole, createParcels, getParcelsByEmail, deleteParcel, getParcelDetails } = require('../Controller/userController');
const router = express.Router();
router.get('/', getServer)

// google apis
router.get('/distance', getDistance),


    // admin apis


    // user apis 

    //post operation
    router.post("/users", createUser); // user apis 
router.post("/parcels", createParcels);// user apis 
router.delete("/parcels/:id", deleteParcel);// user apis 

// get operation
router.get("/parcels", getParcelsByEmail);// user apis 
router.get("/parcel/details/:id", getParcelDetails)
router.get('/users/role', getUserRole); // Fetch user role 


// agent apis
router.post('/api/agents/apply', applyGents);// agent apis
router.get("/agent-by-email", getAgentByEmail);// agent apis

module.exports = router;
