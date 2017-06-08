var mongoose = require('mongoose');
var connection;

console.log("API: ", process.env.COOKLE);
if (process.env.COOKLE_API === "production") {
//    just some production DB
} else {
    connection = mongoose.connect('mongodb://localhost/iot');
}

module.exports = connection;