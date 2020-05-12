const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
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
        },
        rating:{
            type: Number
        },
        rating_number:{
            type: Number
        }
    },
    { collection: 'vendors'}
);

module.exports = mongoose.model('Vendor', Vendor);