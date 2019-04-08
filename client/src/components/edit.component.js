// create.component.js

import React, { Component } from 'react';

export default class Edit extends Component {
    constructor(props) {
      super(props);
      this.onChangeCustomerId = this.onChangeCustomerId.bind(this);
      this.onChangePhone = this.onChangePhone.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          id: '',
          phone:'',
      }
  }
  
  onChangeCustomerId(e) {
    this.setState({
      id: e.target.value
    });
  }
  
  onChangePhone(e) {
    this.setState({
      phone: e.target.value
    });
  }
  

  onSubmit(e) {
    e.preventDefault();
	fetch('http://localhost:10010/customers/id/' + this.state.id, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			phone: this.state.phone,
		})
	});
    
	this.setState({
      id: '',
      phone: '',
    })
  }
  
	render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Update Customer's Phone Number</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Customer Id:  </label>
                        <input 
							type="text" 
							className="form-control" 
							value={this.state.id}
							onChange={this.onChangeCustomerId}
						/>
                    </div>
					
                    <div className="form-group">
                        <label>Updated Phone Number: </label>
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