const model = require('../database/models');

const getLightSensorData = (cb) => {
    let intensityLastTenSec = [];

    model.Sensor.find({ category: 'light' }, { reading: 1, _id: 0 }, { sort: { _id: -1 } }).limit(10).exec(function (err, data) {
        if(err) {
            cb({ status: 400, data: { message: "Error during fetching data" } });
        }

        data.forEach(item => intensityLastTenSec.push(item.reading.intensity));

        cb({ status: 200, data: intensityLastTenSec})
    })
}

const getAirSensorData = (cb) => {

    let airPolution = {
        pm03: 0,
        pm25: 0,
        pm10: 0
    };
    let numberOfReadings = 0;

    model.Sensor.find({ category: 'air' }, { reading: 1, _id: 0 }, { sort: { _id: -1 } }).limit(10).exec(function (err, data) {
        if(err) {
            cb({ status: 400, data: { message: "Error during fetching data" } });
        }

        data.forEach((item) => {
            numberOfReadings++;
            airPolution.pm03 += item.reading.pm03;
            airPolution.pm25 += item.reading.pm25;
            airPolution.pm10 += item.reading.pm10;
        });
        airPolution.pm03 /= numberOfReadings;
        airPolution.pm25 /= numberOfReadings;
        airPolution.pm10 /= numberOfReadings;

        cb({ status: 200, data: airPolution})
    })
}

module.exports = { getLightSensorData, getAirSensorData }