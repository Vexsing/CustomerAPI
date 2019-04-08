// create.component.js

import React, { Component } from 'react';
import axios from 'axios'

export default class SearchId extends Component {
    constructor(props) {
      super(props);
      this.onChangeId = this.onChangeId.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.state = {
          id:'',
      }
  }
  
  onChangeId(e) {
    this.setState({
      id: e.target.value
    });
  }
  

  onSubmit(e) {
    e.preventDefault();
	axios.get('http://localhost:10010/customers/id/' + this.state.id)
		.then(response => console.log(response.data))
		
	this.setState({
      id: '',
    })
  }
  
	render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Search for Customers by ID Number</h3>
                <form onSubmit={this.onSubmit}>
					
                    <div className="form-group">
                        <label>Customer's ID: </label>
                        <input 
							type="text" 
							className="form-control" 
							value={this.state.id}
							onChange={this.onChangeId}
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