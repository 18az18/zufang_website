// User routes below
'use strict';

const {apartment} = require('../models/apartment');
const {ObjectID} = require('mongodb');
const {authenticateManager, authenticateAdmin, authenticateUser, authenticateSelfOrManager} = require("./authentication");
module.exports = function (app) {
    app.post("/newAPT", authenticateManager, (req, res)=>{
        const apt = new apartment({
            unitNumber: req.body.number,
            type: req.body.type,
            area: req.body.area,
            description: req.body.description,
            exposure: req.body.exposure,
            sellingPrice: req.body.sellingPrice,
            rentalPrice: req.body.rentalPrice,
            currentStatus: req.body.status
        })
        apt.save()
        .then((apt)=>{
            res.status(200).send({
                error: false,
                apartment: apt
            });
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    }
    )


    app.put('/updateAPT/:id', authenticateManager, (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }
        apartment.findById(id).then((result) => {
            if (!result) {
                res.status(404).send();
            } else {
                Object.assign(result, req.body);
                result.save().then((result) => {
                    if (!result) {
                        res.status(500).send({error:true, message:"fail to save to database"});
                    } else {
                        res.status(200).send({error: false});
                    }
                }, (error) => {
                    console.log(error);
                    return Promise.reject(error);
                });
            }
        }).catch((error) => {
            res.status(400).send(error);
        });
    });

    
};