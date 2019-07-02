// User routes below
'use strict';

// The URL to redirect to after email redirection
const EmailURL = 'http://localhost:4200/';


const {    User} = require('../models/user');
const {    ObjectID} = require('mongodb');
const {authenticateManager, authenticateAdmin, authenticateUser, authenticateSelfOrManager} = require("./authentication");
const {transporter} = require('./email');
const randomstring = require('randomstring');



module.exports = function (app) {

    // user signup
    app.post('/signup',
        (req, res) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                subscribed: false,
                role:"guest",
                emailSecret: randomstring.generate()
                // currently skipping verify email part
            });
            // save user to the database
            user.save().then((user) => {                
                const mailOptions = {
                    from: 'Ustyle Condominium', 
                    to: user.email, 
                    subject: 'email verification - non reply', 
                    text: '', 
                    html: '<div>\
                                <h1 >Welcome to join Ustyle</h1>\
                                <br>\
                                <br>\
                                <a href="http://localhost:3000/verifyemail/'+user.emailSecret+'/'+user._id+'"> <strong> click here for email verification</strong></a>\
                                <br>\
                                <h4>Ustyle Community</h4>\
                            </div>' // html body
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                    res.status(200).send({
                        error: false,
                        user: user
                    });
                });
                
            })
            .catch((error) => {
                // handle duplicate username
                if (error.code == 11000) {
                    res.status(400).send({
                        error: true,
                        message: "Duplicate user name, please try another one."
                    })
                    // handle invalid email address
                } else if (error.errors && error.errors.email) {
                    res.status(400).send({
                        error: true,
                        message: "Please enter a valid email address."
                    })
                    // handle other error, the error invalid password is already handled by frontend
                } else {
                    res.status(400).send({
                        error: true,
                        message: error
                    });
                }
            })
        });

    // handle email verification
    app.get('/verifyemail/:secret/:id', (req,res)=>{
        const id = req.params.id;
        const secret = req.params.secret;
        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }
        User.findById(id).then((result) => {
            if (!result) {
                res.status(404).send();
            } else {
                if(result.emailSecret === secret){
                    result.emailVerified = true;
                    result.save().then((result) => {
                        if (!result) {
                            res.status(500).send({error:true, message:"fail to save to database"});
                        } else {
                            // redirect to our main page
                            req.session.user = result._id;
                            res.redirect(EmailURL);
                        }
                    }, (error) => {
                        return Promise.reject(error);
                    });
                }else{
                    res.status(400).send({error:true, message: 'incorrect token'});
                }
            }
        }).catch((error) => {
            res.status(400).send(error);
        });

    })


    // user login
    // response include a verified field, if false implies the user hasnt gone through email verification
    // request body: {name:..., password:...}
    app.post('/login',
        (req, res) => {
            const name = req.body.name;
            const password = req.body.password;

            User.findByNamePassword(name, password).then((user) => {
                if (!user) {
                    res.status(401).send({error:true, message: 'incorrect password or username'});
                } else {
                    req.session.user = user._id;
                    if(user.emailVerified){
                        console.log("user: " + req.session.user + " has logged in");
                        res.status(200).send({
                            usertype: user.role,
                            username: user.name,
                            id: user._id,
                        });
                    }else{
                        res.status(401).send({error:true, message:'email unverified'});
                    }
                }
            }).catch((error) => {
                res.status(401).send({error:true, message: 'incorrect password or username'});
            })
        });

    // user logout, body doesnt need any parameter
    app.delete('/logout', (req, res) => {
            console.log("user: " + req.session.user + " has logged out");
            req.session.destroy((error) => {
                if (error) {
                    res.status(500).send(error);
                } else {
                    res.status(200).send();
                }
            })
        });

    // update user
    // body:{name:" the specific username of the user", email/phonenumer/password/subscribed:"value to replace"}
    app.patch('/userSelfUpdate/:id', authenticateSelfOrManager, (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }
        User.findById(id).then((result) => {
            if (!result) {
                res.status(404).send();
            } else {
                result.password = req.body.password ? req.body.password : result.password;
                result.email = req.body.email ? req.body.email : result.email;
                result.phoneNumber = req.body.phoneNumber? req.body.phoneNumber : result.phoneNumber;
                result.subscribed = req.body.subscribed? req.body.subscribed: result.subscribed;
                result.save().then((result) => {
                    if (!result) {
                        res.status(500).send({error:true, message:"fail to save to database"});
                    } else {
                        res.status(200).send({error: false});
                    }
                }, (error) => {
                    return Promise.reject(error);
                });
            }
        }).catch((error) => {
            res.status(400).send({error:true, message:error});
        });
    });

    // update user
    // body:{name:" the specific username of the user", differ from above, anyfield except role can be updated }
    // role update can only be updated for guest/residence not for manager/admin, update for manager/admin bust be done manually through
    // database 
    app.patch('/userManagerUpdate/:id', authenticateManager, (req, res) => {
        const id = req.params.id;
        if (!ObjectID.isValid(id)) {
            res.status(404).send();
        }
        User.findById(id).then((result) => {
            if (!result) {
                res.status(404).send();
            } else {
                result.password = req.body.password ? req.body.password : result.password;
                result.email = req.body.email ? req.body.email : result.email;
                result.phoneNumber = req.body.phoneNumber? req.body.phoneNumber : result.phoneNumber;
                result.subscribed = req.body.subscribed? req.body.subscribed: result.subscribed;
                result.name = req.body.name? req.body.name:result.name;
                result.emailVerified = req.body.emailVerified? req.body.emailVerified: result.emailVerified;
                // be extra careful updating the role
                if (req.body.role 
                    && (req.body.role ==="guest"||req.body.role ==="residence") 
                    && (result.role ==="guest" || result.role ==="residence")){
                    result.role = req.body.role;
                }
                result.save().then((result) => {
                    if (!result) {
                        res.status(500).send({error:true, message:"fail to save to database"});
                    } else {
                        res.status(200).send({error: false});
                    }
                }, (error) => {
                    return Promise.reject(error);
                });
            }
        }).catch((error) => {
            res.status(400).send({error:true, message: error});
        });
    });


    // get the user's info for manager
    app.get('/user/:name', authenticateManager, 
        (req, res) => {
            const name = req.params.name;
            User.findOne({
                name: name
            }).then((result) => {
                if (!result) {
                    res.status(404).send();
                } else {
                    res.status(200).send(result);
                }
            }, (error) => {
                res.status(500).send(error);
            });
        });

        app.get('/userstatus',
        (req, res) => {
            if (req.session.user) {
                User.findById(req.session.user).then((user) => {
                    if (!user) {
                        req.session.destroy();
                        res.status(200).send({user: null});
                    } else {
                        res.status(200).send({ user:user});
                    }
                }).catch((error) => {
                    req.session.destroy();
                    res.status(200).send({user: null});
                })
            } else {
                res.status(200).send({user: null});
            }
        });
};