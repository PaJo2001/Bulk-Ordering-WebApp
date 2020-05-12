import React, {Component} from 'react';
import axios from 'axios';
import {Button , Form, FormGroup, Label, Input} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            search: '',
            }
        this.fetchProducts = this.fetchProducts.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSubmitSearch= this.onSubmitSearch.bind(this);

    }

    onChangeSearch(event) {
        this.setState({ search: event.target.value });
    }

    fetchProducts() {
        this.setState({
            loading: true,
            search:''
        })
        axios.post('http://localhost:4000/view_products')
             .then(response => {
                 console.log(response.data)
                 this.setState({
                     products: response.data,
                     loading: false,
                     search:''
                });
             })
             .catch(function(error) {
                 console.log(error);
                 this.setState({
                    products: [],
                    loading: false,
                    search:''
               });
             })
    }
    componentDidMount() {
        this.fetchProducts()
    }

    onSubmitSearch(event)
    {
        event.preventDefault();
        let k= this.state.search
        if(k ==='')
        {
            //this.fetchProducts()
                 this.setState({
                     products: this.state.products,
                     loading: false,
                     search:''
                }, () => {
                var e = document.getElementById("Sort");
                var sorttype = e.options[e.selectedIndex].value;
                if(sorttype === 'Sort By')
                {    }
                else if (sorttype === 'Price')
                {
                    let newProduct = this.state.products
                    newProduct = newProduct.sort(function(a,b){return (a.price - b.price)})
                    this.setState({
                        products:newProduct
                    })
                }
                else if (sorttype === 'Quantity')
                {
                    let newProduct = this.state.products
                    newProduct = newProduct.sort(function(a,b){return (b.quantity - a.quantity)})
                    this.setState({
                        products:newProduct
                    })
                    console.log('Reached here')
                }
                else if (sorttype === 'Rating')
                {
                    let newProduct = this.state.products
                    newProduct = newProduct.sort(function(a,b){return (b.vendor_rating - a.vendor_rating)})
                    this.setState({
                        products:newProduct
                    })
                }});
        }    
        else{
            const searchdata = {
                searchresult : this.state.search
            }
            axios.post('http://localhost:4000/view_products_search',searchdata)
             .then(response => {
                 console.log(response.data)
                 this.setState({
                     products: response.data,
                     loading: false,
                     search:''
                }, () => {
                console.log("CAME HERE")
                var e = document.getElementById("Sort");
                var sorttype = e.options[e.selectedIndex].value;
                if(sorttype === 'Sort By')
                {    }
                else if (sorttype === 'Price')
                {
                    let newProduct = this.state.products
                    newProduct = newProduct.sort(function(a,b){return (b.price - a.price)})
                    this.setState({
                        products:newProduct
                    })
                }
                else if (sorttype === 'Quantity')
                {
                    let newProduct = this.state.products
                    console.log(newProduct, "HERER")
                    newProduct = newProduct.sort(function(a,b){return (b.quantity - a.quantity)})
                    this.setState({
                        products:newProduct
                    })
                    console.log('Reached here')
                }
                else if (sorttype === 'Rating')
                {
                    let newProduct = this.state.products
                    newProduct = newProduct.sort(function(a,b){return (b.vendor_rating - a.vendor_rating)})
                    this.setState({
                        products:newProduct
                    })
                }
                console.log("search")
                });
             })
             .catch(function(error) {
                 console.log(error);
                 this.setState({
                    products: [],
                    loading: false,
                    search:''
               });
             })
        }
    }

    onSubmit(event, id,product_id,product_name,vendor_email) {
        event.preventDefault();
        var quantity = prompt("Please Enter Quanity Of Product", "");
        console.log(quantity)
        const order_placing = {
            quantity: quantity,
            id: id,
            product_id: product_id,
            product_name: product_name,
            vendor_email: vendor_email,
            customer_email:localStorage.getItem("emaillogged"),
        }
        console.log(order_placing)
        axios.post('http://localhost:4000/place_order',order_placing)
             .then(res => {
                console.log("&&&&&&&&&&7")
                this.fetchProducts()
                })
            .catch(err => {
                console.log('errrorrr')
            });

            this.fetchProducts()
        
    }

    onSubmitReviews(event, vendor_email) {
        event.preventDefault();
        localStorage.setItem('vendoremail',vendor_email)
        this.props.history.push("/customerproductreview")
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
                                    <Link to="/ViewProducts" className="nav-link">View Product</Link>
                                    <Link to="/ViewOrderedProducts" className="nav-link">Ordered Products</Link>
                                    </ul>
                                </div>
                        </nav>
                    <legend>Product Data</legend>
                    <br></br>
                    <Label>Search</Label>
                        <Input type='text' placeholder="Search" name="search" value={this.state.search} onChange = {this.onChangeSearch}/>
                        <br></br>
                        <Button onClick = {this.onSubmitSearch}>Search</Button>
                        <br></br>
                        <br></br>
                        <select id="Sort">
                            <option value="Sort By">Sort By</option>
                            <option value="Price">Price</option>
                            <option value="Quantity">Quantity</option>
                            <option value="Rating">Rating</option>
                            
                        </select>
                    <br></br>
                    <br></br>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product ID</th>
                                <th>Quantiy</th>
                                <th>Price</th>
                                <th>Vendor</th>
                                <th>Vendor Rating</th>
                                <th>Place Order</th>
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
                                        <td><button onClick = {(event) => this.onSubmitReviews(event,currentUser.vendoremail)}>{currentUser.vendoremail}</button></td>
                                        <td>{currentUser.vendor_rating}</td>
                                        <td><button onClick = {(event) => this.onSubmit(event, currentUser._id,currentUser.product_id,currentUser.product_name,currentUser.vendoremail)}>Place Order</button></td>
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