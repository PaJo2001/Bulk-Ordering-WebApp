import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {reviews: [],
                     }
    }

    componentDidMount() {
        const find_vendorproductreview = {
            vendoremail: localStorage.getItem('emaillogged')
        }
        console.log(find_vendorproductreview)
        axios.post('http://localhost:4000/get_reviewproducts',find_vendorproductreview)
             .then(response => {
                 console.log(response.data)
                 this.setState({reviews: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
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
                <legend>Review Data</legend>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product ID</th>
                            <th>Rating</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.reviews.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.product_name}</td>
                                    <td>{currentUser.product_id}</td>
                                    <td>{currentUser.Rate}</td>
                                    <td>{currentUser.Review}</td>
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