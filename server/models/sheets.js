const mongoose = require('mongoose');

const sheets = mongoose.model('sheets', new mongoose.Schema({
    id: String,
    name: String,
    accessLevel: String,
    permalink: String,
    createdAt: Date,
    modifiedAt: Date
}) )

module.exports = sheets;