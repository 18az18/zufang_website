'use strict';

// need the user schema
const {User} = require('../models/user');

// Middleware for authentication for resources
// use authenticate as middleware, any request require admin should user authenticateAdmin instead 
// if user not found or session has no user, return error code 401
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((error) => {
            res.status(401).send();
        })
    } else {
        res.status(401).send();
    }
};

// middleware for admin account
const authenticateAdmin = (req, res, next) => {
    if (req.session.user) {
        User.findOne({_id: req.session.user, role: "admin"}).then((user) => {
            if (!user) {
                req.session.destroy();
                return Promise.reject();
            } else {
                req.user = user;
                next();
            }
        }).catch((error) => {
            res.status(401).send();
        })
    } else {
        res.status(401).send();
    }
};

// middleware for admin/manager account
const authenticateManager = (req, res, next) => {
    if (req.session.user) {
        User.findOne({_id: req.session.user}).then((user) => {
            if (user && (user.role === 'manager' || user.role === "admin")) {
                next();
            } else {
                req.session.destroy();
                return Promise.reject();
            }
        }).catch((error) => {
            res.status(401).send();
        });
    } else {
        res.status(401).send();
    }
};

// allow proceeding only if user is the user in the request parameters or an admin/manager account
const authenticateSelfOrManager = (req, res, next) => {
    if (req.session.user) {
        User.findOne({_id: req.session.user}).then((user) => {
            if (user && (req.session.user === req.params.id || user.role === 'manager' || user.role === "admin")) {
                next();
            } else {
                req.session.destroy();
                return Promise.reject();
            }
        }).catch((error) => {
            res.status(401).send();
        });
    } else {
        res.status(401).send();
    }
};

module.exports = {authenticateAdmin, authenticateUser, authenticateManager, authenticateSelfOrManager};