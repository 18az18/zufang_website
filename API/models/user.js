'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true},
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Not valid email'
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    emailVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    emailSecret:{
        type:String,
        required: false
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    subscribed:{
        type: Boolean,
        required: true,
        default: false
    },
    // potential roles "guest, residence, manager, admin"
    role: {
        type: String,
        required: true,
        default: 'guest'
    },
    program:String
}, {
    timestamps: true
});

// this function find the user corresponds to the given username/password pairs 
UserSchema.statics.findByNamePassword = function(name, password) {
    const User = this;
    return User.findOne({name: name}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        }); 
    })
};

UserSchema.statics.findSubscribedEmails = function(name, password) {
    const User = this;
    return User.find({subscribed: true}).then((users) => {
        if (!users) {
            return [];
        }else{
            return users.map(user=>user.email);
        } 
        ;
    })
};


// This function runs before saving user to database, which encrypt the user password
UserSchema.pre('save', function(next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});



const User = mongoose.model('user', UserSchema);

module.exports = { User };




