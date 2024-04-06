const express = require("express");
const bcrypts = require("bcryptjs");
const model = require("../models/models");
const authRouter = express.Router();

// sign up
authRouter.post("/api/signup", async (req, res) => {
    try {
        // Extracting the data from the request
        const { name, email, phone, password, userType, address } = req.body;

        // Checking whether there is a user with the same email
        const existingUser = await model.User.findOne({ email });
        // If there is a user with the same email, return an error message
        if (existingUser) {
            return res.status(400).json({ msg: "User with the same email address already exists" })
        }

        // Hashing the password
        const hashPassword = await bcrypts.hash(password, 8);

        // Creating the user model with the correct address assignment
        let user = new model.User({
            name,
            email,
            phone,
            password: hashPassword,
            userType,
            address // Assign the address object directly
        });

        // Saving the user data into the database
        user = await user.save();
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

// Sign In
authRouter.post("/api/signin", async (req, res) => {
    try {
        // extracting the data from the request 
        const { email, password } = req.body;
        // checking the wheather the user is present in the database
        const user = await model.User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "there is no user with this email address" });
        }
        console.log(user)
        // if the user is present comparing the password
        const isMatch = await bcrypts.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" })
        }
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})
module.exports = authRouter;
