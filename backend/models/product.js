const mongoose = require('mongoose');

let Product = new mongoose.Schema({
        product_id:{
            type:String
        },
        product_name: {
            type: String
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        },
        vendoremail: {
            type: String
        },
        status: {
            type: String
        },
        vendor_rating: {
            type: Number
        }
    },
    { collection: 'products'}
);

module.exports = mongoose.model('Product', Product);