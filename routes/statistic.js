const express = require('express');
const router = express.Router();
const model = require('../database/models');
const jwt = require('express-jwt');
const client = require('../database/stream');
const helpers = require('../helpers/helpers');
const cron = require('node-cron');

router.get('/statistics', function(req, res){

    let percentage = {
        light: 0,
        air: 0
    }

    model.Sensor.find({ category: 'light' }).exec(function (err, data) {
        if(err) {
            res.json({
                message: "Error during fetching data"
            });
        }

        percentage.light = data.length

        model.Sensor.find({ category: 'air' }).exec(function (err, data) {
            if(err) {
                res.json({
                    message: "Error during fetching data"
                });
            }

            percentage.air = data.length
            res.json(percentage);
        })
    })
});

router.get('/statistics/air', function(req, res){
    helpers.getAirSensorData((data) => {
        res.json(data.data);
    })
});

router.get('/statistics/light', function(req, res){

    helpers.getLightSensorData((data) => {
        res.json(data.data);
    })
});

cron.schedule('*/1 * * * * *', function() {
    helpers.getLightSensorData((data) => {
        client.event.emit( 'iot/light', data.data );
    })
    helpers.getAirSensorData((data) => {
        client.event.emit( 'iot/air', data.data );
    })
})

module.exports = router;