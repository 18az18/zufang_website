'use strict';

const {apartment} = require('../models/apartment');
const {ObjectID} = require('mongodb');
const {authenticateManager, authenticateAdmin, authenticateUser, authenticateSelfOrManager} = require("./authentication");
// const {floor} = require('../models/floor');



module.exports = function (app) {

    // new APT object in db
    app.post("/newAPT", authenticateManager, (req, res)=>{
        const apt = new apartment({
            unitNumber: req.body.number,//string
            floor: req.body.floor,//int
            type: req.body.type,//string
            area: req.body.area,//number
            description: req.body.description,//int array length 3
            exposure: req.body.exposure,//number
            sellingPrice: req.body.sellingPrice,//number
            rentalPrice: req.body.rentalPrice,//number
            currentStatus: req.body.status//string
        })
        // floor.findOneAndUpdate({floorNum:req.body.floor}, {$inc:{EmptyApartmentCount:+1}})
        // .then(()=>)
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
    })

    // if types are constants, better to not use this api, hardcode the types somewhere instead, 
    // as it is quite expensive to loop through all apartments
    app.get("/getAllTypes", (req,res)=>{
        apartment.find({})
        .then((apts)=>{
            let types = apts.map((apt)=>apt.type);
            types = [... new Set(types)];
            res.status(200).send({
                error: false,
                types:types
            })
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })

    // get all available floors given body{type: string}
    app.get("/getAvailableFloorNums", (req, res)=>{
        apartment.find({$and:[{rentedBy:null},{owner:null},{type:req.body.type}] })
        .then((apts)=>{
            let floorNums = apts.map((apt)=>apt.floor);
            floorNums = [ ...new Set(floorNums) ];
            floorNums = floorNums.map((num)=>num.toString());
            res.status(200).send({
                error: false,
                floors: floorNums
            })
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })

    // get method for Apartment Using body:{unitNumber:String unitNumber}
    app.get("/getOneApt", (req,res)=>{
        apartment.findOne({unitNumber: req.body.unitNumber})
        .then((apt)=>{
            res.status(200).send({
                error: false,
                apt: apt
            })
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })


    // get all APT given body:{floorNum: int, type:string}
    app.get("/AllApts", (req, res)=>{
        apartment.find(
            { $and:[{floor:req.body.floorNum},{type:req.body.type}] }
        ).then((aptArray)=>{
            res.status(200).send({
                error: false,
                apartments: aptArray.map( apt=>{return { id:apt.id, unitNumber: apt.unitNumber}})
            })
        }).catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })

    // get all empty apartment given a floor, body:{floorNum: int, type: string}
    app.get("/EmptyApts", (req, res)=>{
        apartment.find(
            { $and:[{floor:req.body.floorNum},{rentedBy:null},{owner:null},{type:req.body.type}] }
        ).then((aptArray)=>{
            res.status(200).send({
                error: false,
                apartments: aptArray.map( apt=>{return { id:apt.id, unitNumber: apt.unitNumber}})
            })
        }).catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })

    // update an APT
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




    // /* BELOW ARE NOT IN USE */

    // //*********  depreciated , floor schema is no longer in use, use the general "/updateAPT" to update ************/
    // /* please use this to update apartment's availability req.body has following field that overwrites field in db  {unitNumber: string unitnumber, owner: id or null, rentedBy: id or null, livedBy: [id] or [], owner/unitnumber/rentedby are mandatory} */
    // app.patch("/changestatus", authenticateManager, (req,res)=>{
    //     apartment.findOne({unitNumber: req.body.unitNumber})
    //     .then((apt)=>{
    //         // case status changed from available to unavailble
    //         if ((apt.owner === null && apt.rentedBy === null) 
    //             && (req.body.owner !== null || req.body.rentedBy !== null)){
    //             return floor.findOneAndUpdate({floorNum: apt.floor}, {$inc:{EmptyApartmentCount:-1}})
    //         // case status changed from unavailable to available
    //         }else if ((apt.owner !== null || apt.rentedBy !== null)
    //             && (req.body.owner === null && req.body.rentedBy === null)){
    //             return floor.findOneAndUpdate({floorNum: apt.floor}, {$inc:{EmptyApartmentCount:+1}})
    //         // case there is no need to update floor
    //         }else{
    //             return Promise.resolve(null);
    //         }
    //     }).then((updatedflr)=>{
    //         let updatedvalue = {}
    //         if (req.body.livedBy){
    //             updatedvalue.livedBy = req.body.livedBy;
    //         }
    //         if (req.body.owner !== undefined){
    //             updatedvalue.owner = req.body.owner;
    //         }
    //         if (req.body.rentedBy !== undefined){
    //             updatedvalue.rentedBy = req.body.rentedBy;
    //         }
    //         return apartment.findOneAndUpdate(
    //             {unitNumber: req.body.unitNumber}, 
    //             updatedvalue
    //             )
    //     }).then(()=>{
    //         res.status(200).send({
    //             error: false,
    //         })
    //     })
    //     .catch((error)=>{
    //         res.status(400).send({
    //             error: true,
    //             message: error
    //         })
    //     })
    // })

    // // create a floor
    // app.post("/createFloor", authenticateManager, (req, res)=>{
    //     const flr =  new floor({
    //         floorNum: req.body.floorNum, 
    //         EmptyApartmentCount: req.body.count ? req.body.count:0
    //     });
    //     flr.save().then((flr)=>{
    //         res.status(200).send({
    //             error: false,
    //             floor: flr
    //         })
    //     }).catch((error)=>{
    //         res.status(400).send({
    //             error: true,
    //             message: error
    //         })
    //     })
    //     })

    
};