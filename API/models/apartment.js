'use strict';

const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    unitNumber: {type:Number, required: true},
    type: {type:String, required: true},
    area: Number,
    description: {type:[Number],required:true, default:[0,0,0]},
    exposure: String,
    sellingPrice: Number,
    rentalPrice: Number,
    currentStatus: String,
    owner: {type:mongoose.Schema.Types.ObjectId, ref:"user", default: null},
    rentedBy: {type:mongoose.Schema.Types.ObjectId, ref:"user", default: null},
});
 
const apartment = mongoose.model('apartment', apartmentSchema);

module.exports = {apartment};