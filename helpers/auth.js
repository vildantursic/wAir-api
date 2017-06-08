const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var authFunctions = {
    generatePass: function (pass, cb) {

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            // hash the password along with our new salt
            bcrypt.hash(pass, salt, function(err, hash) {
                if (err) {
                    throw err;
                }
                cb(hash);
            });
        });
    },
    comparePass: function (passSent, pasTemp, cb) {
        bcrypt.compare(passSent, pasTemp, function(err, isMatch) {
            if (err) return cb(err);

            cb(isMatch);
        });
    }
}

module.exports = authFunctions;