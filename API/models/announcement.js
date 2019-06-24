'use strict';

const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    context: String,
    time : { type : Date, default: Date.now }
});

const announcement = mongoose.model('announcement', announcementSchema);

module.exports = {announcement};




