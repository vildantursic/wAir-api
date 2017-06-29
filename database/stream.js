const deepstream = require('deepstream.io-client-js');
const client = deepstream('localhost:6020').login();
module.exports = client;
