const express = require('express');
const ut = require('./util');
const bdm = require('./db/bbsdb-module');

const aRouter = express.Router();

aRouter.get('/viewChart', ut.isAdmin, (req, res) => {
    bdm.getChartList(rows => {
        let cd = ut.adminViewChart_data(rows);
        const view = require('./view/viewBbsChart');
        let html = view.viewBbsChartForm(req.session.uname, 1, cd.labels, cd.data); 
        res.send(html);
    });
});

module.exports = aRouter;