import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import {Button , Form, FormGroup, Label, Input} from 'reactstrap';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            quantity: '',
            price: '' ,
            product_id: ''
        }

        this.onChangeProduct = this.onChangeProduct.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeProduct_ID = this.onChangeProduct_ID.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeProduct(event) {
        this.setState({ product_name: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ quantity: event.target.value });
    }
    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }
    onChangeProduct_ID(event) {
        this.setState({ product_id: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
        const newUser = {
            product_name: this.state.product_name,
            quantity: this.state.quantity,
            price: this.state.price,
            product_id:this.state.product_id,
            vendoremail: localStorage.getItem('emaillogged'),
            status:"Waiting State",
            vendor_rating: localStorage.getItem('vend_rating')
        }
        console.log(newUser)
        axios.post('http://localhost:4000/add_product', newUser)
             .then(res => {
                 console.log(res.data)
                 if(res.data === 'Product Added'){
                     alert("Product Added")
                    //  localStorage.setItem('namelogged', res.data.name)
                    //  localStorage.setItem('emaillogged', res.data.email)
                    //  this.props.history.push("/customerdashboard")                
                 }
                 else if(res.data === 'Product ID already exists'){
                    alert("Product ID Not Unique")
                    // localStorage.setItem('namelogged', res.data.name)
                    // localStorage.setItem('emaillogged', res.data.email)
                    // this.props.history.push("/vendordashboard")                
                }
                else
                {
                    alert("Incorrect!!");
                }
                });

        this.setState({
            product_name: '',
            quantity: '',
            price: '',
            product_id:''
        });
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
                        <Form className="Login-Form">
                            <FormGroup>
                                <Label>Product Name</Label>
                                <Input type='text' placeholder="Enter Product" value={this.state.product_name} onChange = {this.onChangeProduct}/>
                                <Label>Product ID</Label>
                                <Input type='text' placeholder="Enter Unique ID" value={this.state.product_id} onChange = {this.onChangeProduct_ID}/>
                                <Label>Quantity</Label>
                                <Input type='number' placeholder='Enter Quantity' value={this.state.quantity} onChange = {this.onChangeQuantity}/>
                                <Label>Price</Label>
                                <Input type='number' placeholder='Enter Price' value={this.state.Price} onChange = {this.onChangePrice}/>
                            </FormGroup>
                            <Button onClick = {this.onSubmit}>Create Product</Button>
                        </Form>
                    <br></br>

                </div>
        )
    }
}