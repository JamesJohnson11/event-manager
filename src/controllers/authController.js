const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'notSoSecureSecret';
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    User.findOne({ username: req.body.username }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ err });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this username already exists' });
        }
        User.create({
            username: req.body.username,
            password: req.body.password
        }, (err, newUser) => {
            if (err) {
                return res.status(500).json({ err });
            }

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({ err });
                    }
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({ err });
                        }

                        jwt.sign({
                            id: newUser._id,
                            username: newUser.username
                        }, secret, {expiresIn: expiry}, (err, token) => {
                            if (err) {
                                return res.status(500).json({ err });
                            }
                            return res.status(200).json({ message: 'User registration successful!', token });
                        })
                    })
                })
            })
        })
    })
}