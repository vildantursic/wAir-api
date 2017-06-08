const express = require('express');
const router = express.Router();
const model = require('../database/models');
const jwt = require('express-jwt');

router.get('/statistics', function(req, res){

    model.Sensor.find({}, function (err, data) {
        if(err) {
            res.json({
                message: "Error during fetching data"
            });
        }

        const calculations = {
            text: 'do some calculations'
        };

        res.json(calculations);
    })
});

module.exports = router;