import React, {Component} from 'react';
import { useState } from 'react';
import axios from 'axios';

import {Button , Form, FormGroup, Label, Input} from 'reactstrap';
// import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"


export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        var e = document.getElementById("UserTypeSignUp");
        var usertype = e.options[e.selectedIndex].value;
        let rate=parseInt(0)
        let rate_number=parseInt(0)
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            type:usertype,
            rating:rate,
            rating_number:rate_number
        }

        axios.post('http://localhost:4000/adduser', newUser)
             .then(res => console.log(res.data));

        this.setState({
            name: '',
            email: '',
            password: ''
        });
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
                <Form className="Login-Form">
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type='email' placeholder="Enter Email-ID" name="email" value={this.state.email} onChange = {this.onChangeEmail}/>
                        <Label>Name</Label>
                        <Input type='name' placeholder="Your Name" name="name" value={this.state.name} onChange = {this.onChangeName}/>
                        <Label>Password</Label>
                        <Input type='password' placeholder='Enter Password' value={this.state.password} onChange = {this.onChangePassword}/>
                        <Label>Select User Type</Label><br></br>
                        <select id="UserTypeSignUp">
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                    </FormGroup>
                    <Button onClick = {this.onSubmit}>SignUp</Button>
                </Form>
            </div>
        )
    }
}