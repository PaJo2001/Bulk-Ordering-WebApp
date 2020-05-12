import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
            }
        this.fetchProducts = this.fetchProducts.bind(this)
    }
    fetchProducts() {
        this.setState({
            loading: true
        })
        let customerdetail={
            customer_email: localStorage.getItem("emaillogged")
        }
        axios.post('http://localhost:4000/view_ordered_products',customerdetail)
             .then(response => {
                 console.log(response.data)
                 this.setState({
                     orders: response.data,
                     loading: false
                });
             })
             .catch(function(error) {
                 console.log(error);
                 this.setState({
                    orders: [],
                    loading: false
               });
             })
    }
    componentDidMount() {
        this.fetchProducts()
    }


    onSubmitReviews(event, vendor_email) {
        event.preventDefault();
        localStorage.setItem('vendoremail',vendor_email)
        this.props.history.push("/customerproductreview")
    }


    onSubmitRating(event,vendor_email, product_status, rating_status,order_id) {
        event.preventDefault();
        if(product_status === "Waiting State")
        {
            alert("Order Has Not Been Placed, Cannot Rate Vendor")
        }
        else if(rating_status === "Rated")
        {
            alert("Order Already Rated")
        }
        else
        {   let rating = prompt("Please Enter Rating Of Vendor", "")
            console.log(rating)
            const rate_vendor = {
                rating: rating,
                vendor_email: vendor_email,
                order_id: order_id
            }
            console.log(rate_vendor)
            axios.post('http://localhost:4000/rate_vendor',rate_vendor)
                .then(res => {
                    this.fetchProducts()
                    })
        }
            this.fetchProducts()
        
    }
    onSubmitReview(event,vendor_email, product_status, review_status,order_id) {
        event.preventDefault();
        if(product_status === "Waiting State" || product_status ==="Placed")
        {
            alert("Order Has Not Been Dispatched, Cannot Review")
        }
        else if(review_status === "Reviewed")
        {
            alert("Order Already Reviewed")
        }
        else
        {   let review = prompt("Please Enter Product Review", "")
            console.log(review)
            const review_vendor = {
                review: review,
                vendor_email: vendor_email,
                order_id: order_id
            }
            console.log(review_vendor)
            axios.post('http://localhost:4000/review_order',review_vendor)
                .then(res => {
                    this.fetchProducts()
                    })
        }
            this.fetchProducts()
        
    }


    render() {
        return (
            <div>
                {this.state.loading == true ?
                <p>Loading..</p> :
                <div>
                    <h1>Hello {localStorage.getItem('namelogged')}</h1>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link to="/" className="navbar-brand">App</Link>
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav mr-auto">
                                    <Link to="/loginuser" className="nav-link">Logout</Link>
                                    <Link to="/ViewProducts" className="nav-link">View Product</Link>
                                    <Link to="/ViewOrderedProducts" className="nav-link">Ordered Products</Link>
                                    </ul>
                                </div>
                        </nav>
                    <legend>Ordered Data</legend>
                    <br></br>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product ID</th>
                                <th>Quantiy Ordered</th>
                                <th>Quantiy Left</th>
                                <th>Vendor</th>
                                <th>Status</th>
                                <th>Give Vendor Rating</th>
                                <th>Give Review</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.orders.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.product_name}</td>
                                        <td>{currentUser.product_id}</td>
                                        <td>{currentUser.quantity}</td>
                                        <td>{currentUser.quantity_left}</td>
                                        <td><button onClick = {(event) => this.onSubmitReviews(event,currentUser.vendoremail)}>{currentUser.vendoremail}</button></td>
                                        <td>{currentUser.status}</td>
                                        <td><button onClick = {(event) => this.onSubmitRating(event, currentUser.vendoremail,currentUser.status,currentUser.rating,currentUser._id)}>Give Rating</button></td>
                                        <td><button onClick = {(event) => this.onSubmitReview(event, currentUser.vendoremail,currentUser.status,currentUser.review_status,currentUser._id)}>Give Review</button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                }
                
            </div>
        )
    }
}