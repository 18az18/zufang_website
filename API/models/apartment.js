'use strict';

const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    unitNumber: {type:String, required: true},
    floor: {type:Number,required:true},
    type: {type:String, required: true},
    area: Number,
    description: {type:[Number],required:true, default:[0,0,0]},
    exposure: String,
    sellingPrice: {type:Number,default:null},
    rentalPrice: {type:Number,default:null},
    currentStatus: String,
    owner: {type:mongoose.Schema.Types.ObjectId, ref:"user", default: null},
    rentedBy: {type:mongoose.Schema.Types.ObjectId, ref:"user", default: null},
    livedBy: {type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}], default:[]}
});
 
const apartment = mongoose.model('apartment', apartmentSchema);

module.exports = {apartment};