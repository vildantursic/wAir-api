const mongo = require('./connection');

var models = {
    Sensor: null,
    User: null
};

models.Sensor = mongo.model('Sensor', {
    guid: { type: String, required: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: false },
    ipv6: { type: String, required: true },
    category: { type: String, required: true },
    reading: { type: Object, required: false }
});

models.User = mongo.model('User', {
    guid: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});

module.exports = models;
