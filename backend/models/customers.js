const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        type: {
            type: String
        }
    },
    { collection: 'customers'}
);

module.exports = mongoose.model('Customer', Customer);