import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: [],
                     }
    }

    fetchProducts(){
        const find_vendorproduct = {
            vendoremail: localStorage.getItem('emaillogged')
        }
        console.log(find_vendorproduct)
        axios.post('http://localhost:4000/get_vendorproducts',find_vendorproduct)
             .then(response => {
                 console.log(response.data)
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    componentDidMount() {
        const find_vendorproduct = {
            vendoremail: localStorage.getItem('emaillogged')
        }
        console.log(find_vendorproduct)
        axios.post('http://localhost:4000/get_vendorproducts',find_vendorproduct)
             .then(response => {
                 console.log(response.data)
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    onSubmitCancel(event,product_id) {
        event.preventDefault();
        const orders_cancel = {
            product_id: product_id,
            vendor_email:localStorage.getItem("emaillogged")
        }
        axios.post('http://localhost:4000/cancel_order',orders_cancel)
             .then(res => {
                this.fetchProducts()
                })

        this.fetchProducts()
        alert("Order Cancelled")
        
    }

    render() {
        return (
            <div>
                <h1>Hello {localStorage.getItem('namelogged')}</h1>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                                <Link to="/" className="navbar-brand">App</Link>
                                    <div className="collapse navbar-collapse">
                                        <ul className="navbar-nav mr-auto">
                                            <Link to="/loginuser" className="nav-link">Logout</Link>
                                            <Link to="/createproduct" className="nav-link">Create Product</Link>
                                            <Link to="/showvendorproduct" className="nav-link">Show Product</Link>
                                            <Link to="/dispatchreadyproduct" className="nav-link">Dispatch Product</Link>
                                            <Link to="/dispatchedproduct" className="nav-link">Dispatched Products</Link>
                                            <Link to="/productreview" className="nav-link">Reviews</Link>
                                        </ul>
                                    </div>
                        </nav>
                <legend>Product Data</legend>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.product_name}</td>
                                    <td>{currentUser.product_id}</td>
                                    <td>{currentUser.quantity}</td>
                                    <td>{currentUser.price}</td>
                                    <td><button onClick = {(event) => this.onSubmitCancel(event, currentUser.product_id)}>Cancel Order</button></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}