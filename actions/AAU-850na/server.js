function(properties, context) {

    const { randomBytes } = require('crypto');

    var token = randomBytes(properties.bytes).toString('hex');
    return {
        token: token
    };

}