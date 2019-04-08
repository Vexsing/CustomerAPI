'use strict';

const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./api/controllers/customer');
const mongoose = require('mongoose');
const dbconfig = require('./config');

mongoose.connect(dbconfig.mongodb, { useNewUrlParser: true})
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

db.on('error', 	console.error.bind(console, 'connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/customers', router);

const config = {
  appRoot: __dirname, // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  app.listen(port, function(){
	  console.log('Server is running on port:', port);
  });

});

module.exports = app; // for testing