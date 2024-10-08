import express from "express";
import bcrypt from "bcrypt";
import ExpressBrute from "express-brute";
import jwt from "jsonwebtoken";


const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const saltRounds = 10;

var store = new ExpressBrute.MemoryStore();
var bruteforce =new ExpressBrute(store);

// Mock database (Replace with actual DB connection)
const users = [];

// Registration Route
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        users.push({ email, password: hashedPassword });
        res.status(201).send('User Registered');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

// Login Route
router.post('/login',bruteforce.prevent, async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({email:req.body.email, password:req.body.password})


        res.status(200).send('Login Successful');
    } else {
         return res.status(401).json({"Invalid Credentials"});
    }
});

module.exports = router;
