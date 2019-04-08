// create.component.js

import React, { Component } from 'react';

export default class Create extends Component {
    constructor(props) {
      super(props);
      this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
      this.onChangeAddress = this.onChangeAddress.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
	  this.onChangeEmail = this.onChangeEmail.bind(this);
	  this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          name: '',
          address: '',
          phone:'',
		  email:'',
		  dob:'',
      }
  }
  
  onChangeCustomerName(e) {
    this.setState({
      name: e.target.value
    });
  }
  
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
	console.log(e);
  }
  
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  
  onChangeDateOfBirth(e) {
    this.setState({
      dob: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
	fetch('http://localhost:10010/customers', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: this.state.name,
			phone: this.state.phone,
			address: this.state.address,
			email: this.state.email,
			dob: this.state.dob,
		})
	});
    
	this.setState({
      name: '',
      address: '',
      phone: '',
	  email: '',
	  dob: ''
    })
  }
  
	render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Customer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Customer Name:  </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="John Doe"
							value={this.state.name}
							onChange={this.onChangeCustomerName}
						/>
                    </div>
					
                    <div className="form-group">
                        <label>Address: </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="123 Main St."
							value={this.state.address}
							onChange={this.onChangeAddress}
						/>
                    </div>
					
                    <div className="form-group">
                        <label>Phone phone: </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="555-555-5555"
							value={this.state.phone}
							onChange={this.onChangePhone}
						/>
                    </div>
					<div className="form-group">
                        <label>Email: </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="example@email.com"
							value={this.state.email}
							onChange={this.onChangeEmail}
						/>
                    </div>
					<div className="form-group">
                        <label>Date of Birth: </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="12/25/94"
							value={this.state.dob}
							onChange={this.onChangeDateOfBirth}
						/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}