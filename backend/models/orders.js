const mongoose = require('mongoose');

let Order = new mongoose.Schema({
        product_id:{
            type:String
        },
        product_name: {
            type: String
        },
        quantity: {
            type: Number
        },
        quantity_left: {
            type:Number
        },
        vendoremail: {
            type: String
        },
        customeremail: {
            type: String
        },
        status: {
            type: String
        },
        rating:{
            type:String
        },
        review_status:{
            type:String
        },
        Rate:{
            type:Number
        },
        Review:{
            type: String
        }
    },
    { collection: 'orders'}
);

module.exports = mongoose.model('Order', Order);