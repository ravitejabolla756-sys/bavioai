const { randomUUID } = require('crypto');

function generateApiKey() {
    return `bavio_${randomUUID().replace(/-/g, '')}`;
}

module.exports = { generateApiKey };
