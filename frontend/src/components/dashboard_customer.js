import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Button , Form, FormGroup, Label, Input} from 'reactstrap';
export default class CreateUser extends Component {
render() {
    return (
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
            <br></br>

        </div>
    )
}
}