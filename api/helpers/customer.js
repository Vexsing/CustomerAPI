const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	
	_id: mongoose.Schema.Types.ObjectId,
	
	name: {
		type: String,
		required: true,
		maxlength: 100
	},
	
	address: {
		type: String,
		required: true,
		maxlength: 250
	},
	
	phone: {
		type: String,
		required: true,
		maxlength: 12,
		validate: 
		{
			validator: function(v)
			{
				return /^\d{3}?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v);
			},
			message: props => `${props.value} is not a valid phone number.`
		}
	},
	
	email: {
		type: String,
		required: true,
		maxlength: 100,
		validate: 
		{
			validator: function(v)
			{
				return /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}/.test(v);
			},
			message: props => `${props.value} is not a valid email address.`
		}
	},
	
	dob: {
		type: String,
		required: true,
		maxlength: 8,
		validate: 
		{
			validator: function(v)
			{
				return /^(0[1-9]|1[012])[-\s\/.](0[1-9]|[12][0-9]|3[01])[-\s\/.][0-9]{2}$/.test(v);
			},
			message: props => `${props.value} is not in dd/mm/yy or dd-mm-yy format.`
		}
	}
});

const Customer = mongoose.model('customers', customerSchema);
module.exports = Customer;