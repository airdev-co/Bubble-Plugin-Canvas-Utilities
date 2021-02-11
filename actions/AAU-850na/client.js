function(properties, context) {

    const { randomBytes } = require('crypto');

    var token = randomBytes(128).toString('hex');
    return {
        token: token
    };

}