const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'notSoSecureSecret';
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (err) {
            return res.status(500).json({ err });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists' });
        }
        User.create({
            email: req.body.email,
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
                            email: newUser.email
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


exports.loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) {
            return res.status(500).json({ err });
        }
        if (!foundUser) {
            return res.status(401).json({ message: 'Incorrect email' });
        }
        let match = bcrypt.compareSync(req.body.password, foundUser.password);

        if (!match) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        jwt.sign({
            id: foundUser._id,
            email: foundUser.email
        }, secret, {expiresIn: expiry}, (err, token) => {
            if (err) {
                return res.status(500).json({ err });
            }
            return res.status(200).json({ message: `${foundUser.email} logged in successfully!`, token });
        })
    })
}