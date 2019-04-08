const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const db = require('../../app');
const should = chai.should();
const Customer = require('../helpers/customer');

chai.use(chaiHttp)
	
describe('RESTful Verbs', function(){
	
	beforeEach(function(done){
		Customer.collection.insertMany([
		{ name: "Tommy Tran", address: "123 Lane", phone: "555-555-5555", email: "tommytran@email.com", dob: "09/13/96" },
		{ name: "Michael Bay", address: "12 Hollywood St.", phone: "866-555-5555", email: "michaelbay@email.com", dob: "12/12/12" },
		{ name: "Jethro Williams", address: "65 Main St.", phone: "930-555-5555", email: "jethro-williams@email.com", dob: "03/13/78" }, 
		{ name: "Bruce Banner", address: "194 Hulk Dr.", phone: "631-555-5555", email: "thehulk@avengers.com", dob: "12/18/69" },
		{ name: "Thor Odinson", address: "12 Asgard Pl.", phone: "897-555-5555", email: "thestrongestavenger@avengers.com", dob: "10/12/85" },
		{ name: "Steve Rogers", address: "80 Columbus", phone: "900-555-5555", email: "thecap@avengers.com", dob: "07/04/17" },
		{ name: "Tony Stark", address: "100 Stark Tower", phone: "782-555-5555", email: "ironmanenterprises@avengers.com", dob: "05/29/70" }, 
		{ name: "Natasha Romanova", address: "123 Russia St.", phone: "788-555-5555", email: "notarussianspy@avengers.com", dob: "06/01/84" },
		{ name: "Clint Barton", address: "813 Bullseye Rd.", phone: "100-555-5555", email: "forgottenavenger@avengers.com", dob: "01/07/71" } 
		]);
		done();
	});
	
	afterEach(function(done){
		Customer.collection.drop();
		done();
	});
	
	it('Should list all existing customers from MongoDB database on /customers GET request', function(done) {
		chai.request(db)
		.get('/customers')
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');
			res.body[0].name.should.equal('Tommy Tran');
			res.body[1].name.should.equal('Michael Bay');
			res.body[2].name.should.equal('Jethro Williams');
			res.body[3].name.should.equal('Bruce Banner');
			res.body[4].name.should.equal('Thor Odinson');
			res.body[5].name.should.equal('Steve Rogers');
			res.body[6].name.should.equal('Tony Stark');
			res.body[7].name.should.equal('Natasha Romanova');
			res.body[8].name.should.equal('Clint Barton');
			done();
			
		});
	});
	
	it('Should return existing customer from MongoDB database on customers/id/<id> GET request', function(done) {	
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-555-5555", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		newCustomer.save(function(err, data){
			chai.request(db)
			.get('/customers/id/' + data.id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				
				res.body.name.should.equal('Nick Fury');
				res.body.address.should.equal('Avengers HQ');
				res.body.phone.should.equal('123-555-5555');
				res.body.email.should.equal('nickfury@avengers.com');
				res.body.dob.should.equal('12/25/60');
				
				done();
			});
		});
	});
	
	it('Should return existing customers from MongoDB database on customers/phone/<phone> GET request', function(done) {	
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-555-5555", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		newCustomer.save(function(err, data){
			chai.request(db)
			.get('/customers/phone/' + data.phone)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				
				res.body[0].name.should.equal('Nick Fury');
				res.body[0].address.should.equal('Avengers HQ');
				res.body[0].phone.should.equal('123-555-5555');
				res.body[0].email.should.equal('nickfury@avengers.com');
				res.body[0].dob.should.equal('12/25/60');
				
				done();
			});
		});
	});
	
	it('Should add customer to MongoDB database on /customers POST request', function(done) {	
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-555-5555", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		chai.request(db)
		.post('/customers')
		.send(newCustomer)
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
				
			res.body.ADDED.name.should.equal('Nick Fury');
			res.body.ADDED.address.should.equal('Avengers HQ');
			res.body.ADDED.phone.should.equal('123-555-5555');
			res.body.ADDED.email.should.equal('nickfury@avengers.com');
			res.body.ADDED.dob.should.equal('12/25/60');
				
			done();
		});
	});
	
	it('Should update product from MongoDB database on /customers/id/<id> PUT request', function(done) {
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "987-654-3210", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		newCustomer.save(function(err, newCustomer){
			chai.request(db)
			.put('/customers/id/' + newCustomer._id)
			.send({phone: "123-456-6789"})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
						
				res.body.UPDATED.name.should.equal('Nick Fury');
				res.body.UPDATED.address.should.equal('Avengers HQ');
				res.body.UPDATED.phone.should.equal('123-456-6789');
				res.body.UPDATED.email.should.equal('nickfury@avengers.com');
				res.body.UPDATED.dob.should.equal('12/25/60');
						
				done();
			});
		});
	});
	
	it('Should remove product from MongoDB database on /customers/id/<id> DELETE request', function(done) {
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "987-654-3210", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		newCustomer.save(function(err, newCustomer){
			chai.request(db)
			.delete('/customers/id/' + newCustomer._id)
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
						
				res.body.REMOVED.name.should.equal('Nick Fury');
				res.body.REMOVED.address.should.equal('Avengers HQ');
				res.body.REMOVED.phone.should.equal('987-654-3210');
				res.body.REMOVED.email.should.equal('nickfury@avengers.com');
				res.body.REMOVED.dob.should.equal('12/25/60');
						
				done();
			});
		});
	});
	
	it('Should return 500 error when passing invalid phone number on /customers POST request', function(done) {
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-5999-588-555-5555", email: "nickfury@avengers.com", dob: "12/25/60" });
		
		chai.request(db)
		.post('/customers')
		.send(newCustomer)
		.end(function(err, res){
			res.should.have.status(400);
				
			done();
		});
	});
	
	it('Should return 500 error when passing invalid email on /customers POST request', function(done) {
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-555-5555", email: "nickfury@avengers_notgoodemail", dob: "12/25/60" });
		
		chai.request(db)
		.post('/customers')
		.send(newCustomer)
		.end(function(err, res){
			res.should.have.status(400);
				
			done();
		});
	});
	
	it('Should return 500 error when passing invalid dob on /customers POST request', function(done) {
		let newCustomer = new Customer({_id: new mongoose.Types.ObjectId(), name: "Nick Fury", address: "Avengers HQ", phone: "123-555-5555", email: "nickfury@avengers.com", dob: "13/25/2060" });
		
		chai.request(db)
		.post('/customers')
		.send(newCustomer)
		.end(function(err, res){
			res.should.have.status(400);
				
			done();
		});
	});
	
});