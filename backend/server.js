const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Customer = require('./models/customers.js');
let Vendor = require('./models/vendors.js');
let Product = require('./models/product.js');
let Order = require('./models/orders.js')

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/DATA', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the users
userRoutes.route('/get_customers').get(function(req, res) {
    Customer.find(function(err, customers) {
        if (err) {
            console.log(err);   
        } else {
            res.json(customers);
        }
    });
});
userRoutes.route('/get_vendors').get(function(req, res) {
    Vendor.find(function(err, vendors) {
        if (err) {
            console.log(err);   
        } else {
            res.json(vendors);
        }
    });
});

// Adding a new user
userRoutes.route('/adduser').post(function(req, res) {
            if (req.body.type === 'Vendor')
            {   Vendor.findOne({
                "email":  req.body.email,
                }, (err, vendors) => {
                    if(vendors) {
                        console.log("email id already exists")
                    }
                    else
                    {
                        let vendor = new Vendor(req.body);
                        vendor.save()
                            .then(user => {
                                res.status(200).json({'Vendor': 'Vendor added successfully'});
                            })
                            .catch(err => {
                                res.status(400).send('Error');
                            });
                    }
                });
            }
            else
            {
                Customer.findOne({
                    "email":  req.body.email,
                    }, (err, customers) => {
                        if(customers) {
                            console.log("email id already exists")
                        }
                        else
                        {
                            let customer = new Customer(req.body);
                            customer.save()
                                .then(user => {
                                    res.status(200).json({'Customer': 'Customer added successfully'});
                                })
                                .catch(err => {
                                    res.status(400).send('Error');
                                });
                        }
                    });
            }
            
       });
    
//logging in user
userRoutes.route('/loginuser').post(function(req, res) {
    if (req.body.type === 'Vendor')
            {   Vendor.findOne({
                "email":  req.body.email,
                "password":  req.body.password
                }, (err, vendors) => {
                    if(vendors) {
                        console.log(vendors.rating)
                        res.status(200).send({
                            message: 'vendor logged in',
                            name: vendors.name,
                            email: vendors.email ,
                            rating: vendors.rating
                        })
                    }
                    else
                    {
                        console.log("invalid")
                        res.status(200).send({
                            message: 'invalid user',
                        })
                    }
                });
            }
    
    else
    {
        Customer.findOne({
            "email":  req.body.email,
            "password":  req.body.password
            }, (err, customers) => {
                if(customers) {
                    console.log("access granted")
                    res.status(200).send({
                        message: 'customer logged in',
                        name: customers.name,
                        email: customers.email
                    })
                }
                else
                {
                    console.log("invalid")
                    res.status(200).send({
                        message: 'invalid user',
                    })
                }
            });
    }
 
});

//adding product
userRoutes.route('/add_product').post(function(req, res) { 
    Product.findOne({
        "product_id":  req.body.product_id,
        }, (err, products) => {
            if(products) {
                console.log("product id already exists")
                res.status(200).send('Product ID already exists');
            }
            else
            {
                let product = new Product(req.body);
                console.log(product)
                product.save()
                    .then(user => {
                        res.status(200).send('Product Added');
                    })
                    .catch(err => {
                        res.status(200).send('Error');
                    });
            }        
    
    });
});    

//getting vendors_products
userRoutes.route('/get_vendorproducts').post(function(req, res) {
    Product.find({
        "vendoremail":req.body.vendoremail,
        "status":"Waiting State"
    },(err,products) => {
        if (products) {
            res.json(products);   
        } else {
            console.log(err);
        }
    });
});

//Displaying Products
userRoutes.route('/view_products').post(function(req, res) {
    Product.find({"status":"Waiting State"},function(err, products){
        if (err) {
            console.log(err);   
        } else {
            res.json(products);
        }
    });
});

userRoutes.route('/view_products_search').post(function(req, res) {
    Product.find({"status":"Waiting State", "product_name":req.body.searchresult},function(err, products){
        if (err) {
            console.log(err);   
        } else {
            res.json(products);
        }
    });
});

//placing order
userRoutes.route('/place_order').post(function(req, res) {
    //console.log(req.body.quantity)
    let new_quantity=-5
    let flag=0
    Product.findOne({
        "product_id":  req.body.product_id,
        }, (err, products) => {
            if(products) {
                let total_products = parseInt(products.quantity)
                //console.log(total_products) 
                let removal_quantity = parseInt(req.body.quantity)
                //console.log(removal_quantity)   
                new_quantity = total_products - removal_quantity
                console.log(new_quantity)
                if(new_quantity>0)
                {
                    flag=1
                }
                if(new_quantity==0)
                {
                    flag=2
                }
                if(removal_quantity<0)
                {
                    flag=0
                }
                console.log(flag)

            }
            if(flag==0)
            {
                res.status(200).send('wrong quantity value')
                console.log('heelo123')
            }
            else if(flag==1)
            {   console.log("hello45")
                let newOrder={
                    product_id: req.body.product_id,
                    product_name:  req.body.product_name,
                    quantity: parseInt(req.body.quantity),
                    quantity_left: new_quantity,
                    vendoremail:req.body.vendor_email, 
                    customeremail:req.body.customer_email,
                    status: "Waiting State",
                    rating: "Not Rated",
                    review_status: "Not Reviewed",
                    Rate : "",
                    Review: ""
                }

                let order = new Order(newOrder)
                order.save()
                Product.updateMany({
                    "product_id":  req.body.product_id,
                    },{quantity:new_quantity, status:"Waiting State"}, function(err, product){
                        console.log(product)
                    }
                 );
                console.log(order.rating)
                Order.updateMany({
                   "product_id":  req.body.product_id,
                   },{quantity:new_quantity, status:"Waiting State"},function(err, order){
                    console.log(order)
                }
               
                );
               
                res.status(200).send('Bought')
                
            }
            else if(flag==2)
            {
                let newOrder={
                    product_id: req.body.product_id,
                    product_name:  req.body.product_name,
                    quantity: parseInt(req.body.quantity),
                    quantity_left: new_quantity, 
                    vendoremail:req.body.vendor_email,
                    customeremail:req.body.customer_email,
                    status: "Placed",
                    rating: "Not Rated",
                    review_status: "Not Reviewed",
                    Rate : "",
                    Review: ""
                }

                let order = new Order(newOrder)
                order.save()
                Product.updateMany({
                   "product_id":  req.body.product_id,
                   },{quantity:new_quantity, status:"Placed"},function(err, product){
                    console.log(product)
                }
                );
                Order.updateMany({
                    "product_id":  req.body.product_id,
                    },{quantity:new_quantity, status:"Placed"},function(err, order){
                        console.log(order)
                    }
               
                );
                // Product.deleteMany({"product_id": req.body.product_id},function(err, product){
                //     console.log(product)
                //     }
                //);
                res.status(200).send('Bought')
            }
    });
}); 

//View Ordered Products
userRoutes.route('/view_ordered_products').post(function(req, res) {
    Order.find({
        "customeremail":req.body.customer_email,
    },(err,orders) => {
        if (orders) {
            res.json(orders);   
        } else {
            console.log(err);
        }
    });
});

//ViewOrdersReadyToDispatch
userRoutes.route('/dispatch_product').post(function(req, res) {
    Product.find({
        "vendoremail":req.body.vendoremail,
        "status":"Placed"
    },(err,products) => {
        if (products) {
            res.json(products);   
        } else {
            console.log(err);
        }
    });
});

//Dispatch Orders
userRoutes.route('/dispatch_order').post(function(req, res) {
    Product.updateMany({
        "product_id":req.body.product_id,
        "status":"Placed"
    },{status:"Order Dispatched"},function(err,products){
        console.log(products)
    }
    );
    Order.updateMany({
        "product_id":req.body.product_id,
        "status":"Placed"
    },{status:"Order Dispatched"},function(err,products){
        res.status(200).send('Order Dispatched')
    }
    );
});

//ViewOrdersDispatched
userRoutes.route('/view_dispatched_products').post(function(req, res) {
    Product.find({
        "vendoremail":req.body.vendor_email,
        "status":"Order Dispatched"
    },(err,products) => {
        if (products) {
            res.json(products);   
        } else {
            console.log(err);
        }
    });
});

//Cancel Order
userRoutes.route('/cancel_order').post(function(req, res) {
    Product.updateMany({
        "product_id":req.body.product_id,
    },{status:"Order Cancelled"},function(err,products){
        console.log('Order Cancelled')
    }
    );
    Order.updateMany({
        "product_id":req.body.product_id,
    },{status:"Order Cancelled"},function(err,products){
        res.status(200).send('Order Cancelled')
    }
    );
});

//Rate Vendor
userRoutes.route('/rate_vendor').post(function(req, res) {
    let added_rating = 0
    let new_rating_number = 0


    Vendor.findOne({
        "email":req.body.vendor_email,
    },(err,vendor) => {
        if (vendor) {
            let number_of_rate= parseInt(vendor.rating_number)
            let previuos_rating = parseInt(vendor.rating)
            let new_rating = parseInt(req.body.rating)
            added_rating=(((parseInt(previuos_rating)*parseInt(number_of_rate))+ parseInt(new_rating))/(parseInt(number_of_rate)+parseInt(1)))
            new_rating_number=parseInt(number_of_rate)+parseInt(1)
            Vendor.updateMany({
                "email":req.body.vendor_email,
            },{"rating":added_rating, "rating_number": new_rating_number},function(err,products){
                 res.status(200).send('Rate Vendor')
            }
            );

            Order.updateMany({
                "_id": req.body.order_id,
                },{"rating":"Rated", "Rate": req.body.rating},function(err,order){
                    console.log("Order Rated")
                }
                
            );
        } 
        
    }
    );
    

    });

//Review Product
userRoutes.route('/review_order').post(function(req, res) {
    Order.updateMany({
        "_id": req.body.order_id,
        },{"review_status":"Reviewed", "Review": req.body.review},function(err,order){
            console.log("Order Reviewed")
        }
    );
});

//Get Review Of Product
userRoutes.route('/get_reviewproducts').post(function(req, res) {
    Order.find(function(err, reviews) {
        if (err) {
            console.log(err);   
        } else {
            res.json(reviews);
        }
    });
});


app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
