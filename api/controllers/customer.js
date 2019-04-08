const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Customer = require('../helpers/customer');
	
	router.get('/', findAllCustomers);
	router.get('/id/:id', findCustomerById);
	router.get('/phone/:phone', findCustomerByPhone);
	router.post('/', addCustomer);
	router.put('/id/:id', updatePhoneNumber);
	router.delete('/id/:id', delCustomer); 
	
	//GET /customers operationId
    function findAllCustomers(req, res, next) 
	{
		Customer.find(function(err, customers)
		{
			if(err)
			{
				res.sendStatus(500);
			}
			else
			{
				res.json(customers);
			}
		});
    }
	
	//POST /customers operationId                     
    function addCustomer(req, res, next) {
	let newCustomer = new Customer(
	{
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		address: req.body.address,
		phone: req.body.phone,
		email: req.body.email,
		dob: req.body.dob
	});
	
	newCustomer.save(function(err) {
		if(err) 
		{
			res.sendStatus(400);
		}
		else
		{
			res.json({'ADDED': newCustomer});
		}
	});
}
	
	//GET /customers/id/{id} operationId
    function findCustomerById(req, res, next) 
	{
        Customer.findById(req.params.id, function(err, customer) 
		{
			if (err)
			{	
				res.sendStatus(404);
			}
			else
			{
				res.json(customer);
			}
		});    
    }
	
	//PUT /customers/id/{id} operationId
    function updatePhoneNumber(req, res, next) 
	{
        Customer.findById(req.params.id, function(err, customer) {
			if(err)
			{
				res.sendStatus(404);
			}
			else
			{	
				customer.phone = req.body.phone;
				customer.save(function(err) {
					if(err) 
					{
						res.sendStatus(400);
					}
					else
					{
						res.json({'UPDATED': customer});
					}	
				});
			}				
		});
	}
    
    //DELETE /customer/customer/{id} operationId
    function delCustomer(req, res, next) 
	{
        Customer.findById(req.params.id, function(err, customer) {
			if(err)
			{
				res.sendStatus(404);
			}
			else
			{	
				customer.remove(function(err) {
					if(err) 
					{
						res.sendStatus(500);
					}
					else
					{
						res.json({'REMOVED': customer});
					}	
				});
			}				
		});
	}
	
	//GET /customers/phone/{phone} operationId
    function findCustomerByPhone(req, res, next)
	{
        Customer.find({phone: req.params.phone}, function(err, customer) 
		{
			if (err)
			{
				res.sendStatus(404);
			}
			else
			{
				res.json(customer);
			}
		});    
	}
	
	module.exports = router;

		