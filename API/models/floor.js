'use strict';

const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
    EmptyApartmentCount: {type:Number, default:0},
    floorNum: {type: Number, required: true}
});


const floor = mongoose.model('floor', floorSchema);

module.exports = {floor};