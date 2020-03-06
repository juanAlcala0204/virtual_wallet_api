require('dotenv').config();

const CONFIG = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT || 3000
}

module.exports = { CONFIG }