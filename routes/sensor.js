const express = require('express');
const router = express.Router();
const model = require('../database/models');
const uuid = require('uuid4');
const jwt = require('express-jwt');
const cron = require('node-cron');
const faker = require('faker');
const client = require('../database/stream');

router.get('/sensor', function(req, res){

    model.Sensor.find({}, function (err, data) {
        if(err) {
            res.json({
                message: "Error during fetching data"
            });
        }

        res.json(data);
    })
});

router.get('/sensor/:category', function(req, res){

    model.Sensor.find({ category: req.params.category }, function (err, data) {
        if(err) {
            res.json({
                message: "Error during fetching single sensor category"
            });
        }

        res.json(data);
    })
});

router.post('/sensor', function(req, res) {
    const sensor = new model.Sensor({
        guid: uuid(),
        title: req.body.title,
        ipv6: faker.internet.ipv6().toString(),
        category: req.body.category
    });
    sensor.save(function (err) {
        if (err) {
            res.json({
                message: "Error during inserting sensor data"
            })
        }

        res.json({
            status: true
        })
    });
});

cron.schedule('*/1 * * * * *', function(){
    const localGuid = uuid();

    let category = faker.random.arrayElement(["light","air"]);

    const sensor = new model.Sensor({
        guid: localGuid,
        title: "Sensor data",
        ipv6: faker.internet.ipv6().toString(),
        category: category,
        reading: category === 'light' ? {
                intensity: faker.random.number({ 'min': 0, 'max': 100 })
            } : {
                pm03: faker.random.number({ 'min': 0, 'max': 100 }),
                pm25: faker.random.number({ 'min': 0, 'max': 100 }),
                pm10: faker.random.number({ 'min': 0, 'max': 100 }),
            }
    });
    sensor.save(function (err) {
        if (err) {
            console.log(400)
        }

        model.Sensor.findOne({ guid: localGuid }, function (err, data) {
            if(err) {
                console.log('Error during fetching single sensor category')
            }

            client.event.emit( 'iot', data );
        })

    });
});

module.exports = router;