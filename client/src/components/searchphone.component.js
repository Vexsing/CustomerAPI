// create.component.js

import React, { Component } from 'react';
import axios from 'axios'

export default class SearchPhone extends Component {
    constructor(props) {
      super(props);
      this.onChangePhone = this.onChangePhone.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          phone:'',
      }
  }
  
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  

  onSubmit(e) {
    e.preventDefault();
	axios.get('http://localhost:10010/customers/phone/' + this.state.phone)
		.then(response => console.log(response.data))
		
	this.setState({
      phone: '',
    })
  }
  
	render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Search for Customers by Phone Number</h3>
                <form onSubmit={this.onSubmit}>
					
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input 
							type="text" 
							className="form-control" 
							placeholder="555-555-5555"
							value={this.state.phone}
							onChange={this.onChangePhone}
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