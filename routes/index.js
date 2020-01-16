const express = require('express');
const app = express();
const cors = require('cors');


app.use( express.json() );
app.use( cors() );

const sheetsRoutes = require('./sheets');

app.use('/api/sheets', sheetsRoutes);

module.exports.routes = app;