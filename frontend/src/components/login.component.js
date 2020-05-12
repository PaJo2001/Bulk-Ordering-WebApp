import React, {Component} from 'react';
import axios from 'axios';

import {Button , Form, FormGroup, Label, Input} from 'reactstrap';
// import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import CustomerDasboard from './dashboard_customer'
// import VendorDasboard from './dashboard_vendor'
export default class CreateUser extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        var e = document.getElementById("UserTypeLogin");
        var usertype = e.options[e.selectedIndex].value;
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            type: usertype
        }

        axios.post('http://localhost:4000/loginuser', newUser)
             .then(res => {
                 console.log(res.data)
                 if(res.data.message === 'customer logged in'){
                     localStorage.setItem('namelogged', res.data.name)
                     localStorage.setItem('emaillogged', res.data.email)
                     this.props.history.push("/customerdashboard")                
                 }
                 else if(res.data.message === 'vendor logged in'){
                    localStorage.setItem('namelogged', res.data.name)
                    localStorage.setItem('emaillogged', res.data.email)
                    localStorage.setItem('vend_rating',res.data.rating)
                    this.props.history.push("/vendordashboard")                
                }
                else
                {
                    alert("Wrong Credentials!!");
                }
                });

        this.setState({
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
                        <Label>Password</Label>
                        <Input type='password' placeholder='Enter Password' value={this.state.password} onChange = {this.onChangePassword}/>
                        <Label>Select User Type</Label><br></br>
                        <select id="UserTypeLogin">
                            <option value="Customer">Customer</option>
                            <option value="Vendor">Vendor</option>
                        </select>
                    </FormGroup>
                    <Button onClick = {this.onSubmit}>Log In</Button>
                </Form>
            </div>
        )
    }
}
