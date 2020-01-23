const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const routes = require('./routes')

mongoose.connect( 'mongodb://localhost/smartsheet-app' )
.then( (result) => {
    console.log('connected to database');
})
.catch( (error) => {
    console.log(error)
    console.log('could not connect to database');
})

//get all sheets


const app = express();
app.use( express.json() );
app.use( routes.routes );

const port = 3000;
app.set('port', port)
app.set('host', '127.0.0.1');
app.listen(port, app.get('host'), () => console.log(`Application started on port ${port} `) );
