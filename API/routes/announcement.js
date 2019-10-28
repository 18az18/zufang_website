'use strict';

const {announcement} = require('../models/announcement');
const {ObjectID} = require('mongodb');
const {User} = require('../models/user');
const {authenticateManager, authenticateAdmin, authenticateUser, authenticateSelfOrManager} = require("./authentication");
const {transporter} = require('./email');

module.exports = function (app) {

    app.get("/getAnnouncements", (req, res) => {
        let page = parseInt(req.query.page)
        let number = parseInt( req.query.number)

        announcement.find().sort({"time": -1 })
        .then((announcements)=>{
            res.status(200).send({
                error: false,
                announcements: announcements.slice(page*number, (page+1)*number)
            })
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    })

    app.post("/newAnnouncement", authenticateManager, (req, res)=>{
        const announce = new announcement(req.body.announcement)
        announce.save()
        .then((announcement)=>{
            if (req.body.email){
                User.findSubscribedEmails()
                .then(
                    (list)=>{
                        console.log(list.join());
                        const mailOptions = {
                            from: 'Ustyle Condominium', 
                            to: list.join(),
                            subject: announcement.title, 
                            text: announcement.context, 
                            html: '' // html body
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                res.status(200).send({
                                    error: true,
                                    message: "email wasnt successfully send"
                                });
                            }
                            console.log('Message sent: ' + info.response);
                            res.status(200).send({
                                error: false,
                                announcement: announcement
                            });
                        });
                    }
                )
            }else{
                res.status(200).send({
                    error: false,
                    announcement: announcement
                });
            }
        })
        .catch((error)=>{
            res.status(400).send({
                error: true,
                message: error
            })
        })
    }
    )


    app.patch('/updateAnnouncement/:id', authenticateManager, (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }
        announcement.findById(id).then((result) => {
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