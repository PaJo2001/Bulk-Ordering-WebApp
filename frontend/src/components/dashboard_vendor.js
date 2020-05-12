import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
                                <Link to="/createproduct" className="nav-link">Create Product</Link>
                                <Link to="/showvendorproduct" className="nav-link">Show Product</Link>
                                <Link to="/dispatchreadyproduct" className="nav-link">Dispatch Product</Link>
                                <Link to="/dispatchedproduct" className="nav-link">Dispatched Products</Link>
                                <Link to='productreview' className="nav-link">Reviews</Link>
                            </ul>
                        </div>
            </nav>
                    <br></br>
        </div>
        )
    }
}