const express = require('express');
const bRouter = express.Router();

const dm = require('./db/userdb-module');
const am = require('./view/alertMsg');
const ut = require('./util');

bRouter.get('/create', (req, res) => {
    
});

module.exports = bRouter;