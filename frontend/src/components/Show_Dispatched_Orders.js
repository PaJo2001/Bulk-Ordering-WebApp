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
        let vendordetail={
            vendor_email: localStorage.getItem("emaillogged")
        }
        axios.post('http://localhost:4000/view_dispatched_products',vendordetail)
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
                                    <Link to="/createproduct" className="nav-link">Create Product</Link>
                                    <Link to="/showvendorproduct" className="nav-link">Show Product</Link>
                                    <Link to="/dispatchreadyproduct" className="nav-link">Dispatch Product</Link>
                                    <Link to="/dispatchedproduct" className="nav-link">Dispatched Products</Link>
                                    <Link to="/productreview" className="nav-link">Reviews</Link>
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
                                <th>Vendor</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        { 
                            this.state.orders.map((currentUser, i) => {
                                return (
                                    <tr>
                                        <td>{currentUser.product_name}</td>
                                        <td>{currentUser.product_id}</td>
                                        <td>{currentUser.vendoremail}</td>
                                        <td>{currentUser.status}</td>
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