import React, { Component } from 'react';
import './App.css';
// import login_icon from './login_icon.png'
// import logo from './Logo.png'
import {Button , Form, FormGroup, Label, Input} from 'reactstrap';
// import {FacebookLoginButton, GoogleLoginButton} from 'react-social-login-buttons'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import UsersList from './components/users-list.component'
import CreateUser from './components/create-user.component'
import LoginUser from './components/login.component'
import CustomerDasboard from './components/dashboard_customer'
import VendorDasboard from './components/dashboard_vendor'
import VendorProductCreation from './components/vendor_createproduct'
import ShowVendorProducts from './components/vendor_showproduct'
import ViewProducts from './components/Customer_ViewProducts'
import OrderedProducts from './components/Customer_OrderedProducts'
import DispatchProduct from './components/Product_Dispatch'
import DispatchedProduct from './components/Show_Dispatched_Orders'
import ReviewProduct from './components/vendor_review_product'
import CustomerReviewProduct from './components/customer_review_product'



class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      name: '',
      password: ''
    }
  }
  render(){
  return (
    <Router>
        <br/>
        <Route path="/" exact component={UsersList}/>
        <Route path="/createuser" component={CreateUser}/>
        <Route path="/loginuser" component={LoginUser}/>
        <Route path="/customerdashboard" component={CustomerDasboard} />
        <Route path="/vendordashboard" component={VendorDasboard}/>
        <Route path="/createproduct" component={VendorProductCreation}/>
        <Route path="/showvendorproduct" component={ShowVendorProducts}/>
        <Route path="/ViewProducts" component={ViewProducts}/>
        <Route path="/ViewOrderedProducts" component={OrderedProducts}/>
        <Route path="/dispatchreadyproduct" component={DispatchProduct}/>
        <Route path="/dispatchedproduct" component={DispatchedProduct}/>
        <Route path="/productreview" component={ReviewProduct}/>
        <Route path="/customerproductreview" component={CustomerReviewProduct}/>
    </Router>
    
  );
      }
}

export default App;
