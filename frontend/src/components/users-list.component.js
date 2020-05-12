import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {customers: [],
                        vendors:[]}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/get_customers')
             .then(response => {
                 this.setState({customers: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        axios.get('http://localhost:4000/get_vendors')
             .then(response => {
                 this.setState({vendors: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">App</Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Users</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/createuser" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/loginuser" className="nav-link">Login</Link>
                        </li>
                        </ul>
                    </div>
                </nav>
                <legend>Customer Data</legend>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.customers.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.type}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
                <br></br>
                <br></br>
                <legend>Vendor Data</legend>
                <br></br>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.vendors.map((currentUser, i) => {
                            return (
                                <tr>
                                    <td>{currentUser.name}</td>
                                    <td>{currentUser.email}</td>
                                    <td>{currentUser.password}</td>
                                    <td>{currentUser.type}</td>
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