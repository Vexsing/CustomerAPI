# Customer API built on MERN stack

app.js runs the node server and express routing. Also handles the connection to the MongoDB database.
	
	CustomerAPI directory
	
	npm start - kicks off mongodb connection and host node.js web server with express routing
		http://localhost:10010
	npm install - installs dependencies for node server
	npm run test - kicks off Mocha+Chai unit testing for the node server
	swagger project edit - opens up OpenAPI spec to edit/test request/responses
	
	Express Routing
		GET - /customers: returns all customers in the current database
		POST - /customers: adds a customer to the database
		GET - /customers/id/<id>: returns a customer with id
		PUT - /customers/id/<id>: updates phone number of customer with id 
		DELETE - /customers/id/<id>: deletes customer with id
		GET - /customers/phone/<phone>: returns customers with phone numbers matching phone

client directory contains React components
	CustomerAPI/client directory
	
	npm start - kicks off React client that can be used to issue request to Node.js server
		Will open a window under http://localhost:3000
	npm install - installs dependencies for React client