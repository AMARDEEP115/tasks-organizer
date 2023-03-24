const { Router } = require("express");
const { userModel } = require("../Models/userModel");
const bcrypt = require('bcrypt');
require("dotenv").config();

const userRouter = Router();

// Create A New Account   - C r u d
userRouter.post("/signup", async (req, res) => {
    let userDetails = req.body;
    let registeredUsers = await userModel.find();
    try {

        // Checking if user with the given credentials is present in Database or not.
        let checkUser = registeredUsers.find(({ name, email, mobile }) => {
            if (name === userDetails.name) {
                return name === userDetails.name;
            } else if (email === userDetails.email) {
                return email === userDetails.email;
            } else if (mobile === Number(userDetails.mobile)) {
                return mobile === Number(userDetails.mobile);
            }
        });

        if (checkUser === undefined) {
            // If user with the given credentials is not present in Database.
            await bcrypt.hash(userDetails.password, Number(process.env.saltRounds), async (err, hash) => {
                if (err) {
                    console.log("error in hasing new user password");
                    res.send({ "message": "Something went wrong" });
                }
                userDetails.password = hash;
                let saveUser = new userModel(userDetails);
                await saveUser.save();
                res.send({ "message": "Registered Successfully" });
            });
        } else {
            // If user with the given credentials is present in Database.
            if (checkUser.name === userDetails.name && checkUser.email === userDetails.email && checkUser.mobile === Number(userDetails.mobile)) {
                res.send({ "message": "Alredy registered try to login" });
            } else if (checkUser.name === userDetails.name && checkUser.email === userDetails.email) {
                res.send({ "message": "Alredy registered with this name and email" });
            } else if (checkUser.name === userDetails.name && checkUser.mobile === Number(userDetails.mobile)) {
                res.send({ "message": "Alredy registered with this name and mobile number" });
            } else if (checkUser.email === userDetails.email && checkUser.mobile === Number(userDetails.mobile)) {
                res.send({ "message": "Alredy registered with this email and mobile number" });
            } else if (checkUser.name === userDetails.name) {
                res.send({ "message": "Alredy registered with this name" });
            } else if (checkUser.email === userDetails.email) {
                res.send({ "message": "Alredy registered with this email" });
            } else if (checkUser.mobile === Number(userDetails.mobile)) {
                res.send({ "message": "Alredy registered with this mobile" });
            }
        }
    } catch (err) {
        res.send({ "message": "Something went wrong" });
    }
});

// For Login   - c R u d
userRouter.post("/signin", async (req, res) => {
    let { email, password } = req.body;
    try {
        // Checking if user with the given credentials is present in Database or not.
        let findUser = await userModel.find({ email: email });
        if (findUser.length === 0) {

            // If user with the given credentials is not present in Database.
            res.send({ "message": "User not found" });
        } else {

            // If user with the given credentials is present in Database.
            await bcrypt.compare(password, findUser[0].password, function (err, result) {
                if (err) {
                    res.send({ "message": "Something went wrong" });
                }
                if (result) {

                    // If user with the given password is present in Correct.
                    findUser[0].password = "* * * * * *";
                    res.send({ "message": "Signin Successfully", "user": findUser[0] });
                } else {

                    // If user with the given password is present in Wrong.
                    res.send({ "message": "Wrong Password" });
                }
            });
        }
    } catch (err) {
        res.send({ "message": "Something went wrong" });
    }
});


// To get all users present in Database  - c R u d
userRouter.get("/", async (req, res) => {
    try {
        let allUsers = await userModel.find();
        res.send({ "message": "All Users", "Users": allUsers });
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" });
    }
});

// get specific a user  - c R u d
userRouter.get("/singleuser/:id", async (req, res) => {
    let ID = req.params.id;
    try {
        let User = await userModel.findById({ _id: ID });
        User[0].password = "* * * * * *";
        res.send({ "message": "Single user", "User": User });
    } catch (err) {
        console.log(err);
        res.send({ "message": "Something went wrong" });
    }
});



// To Edit Loggedin User Account   - c r U d
userRouter.patch("/edit/:id", async (req, res) => {
    let ID = req.params.id;
    let upadtes = req.body;
    try {

        // Checking if user wants to change there password.
        if (upadtes.oldPassword !== "" && upadtes.oldPassword !== undefined) {

            // User wants to change his password
            let findUser = await userModel.findById({ _id: ID });
            await bcrypt.compare(upadtes.oldPassword, findUser.password, async (err, result) => {
                if (err) {
                    res.send({ "message": "Something went wrong" });
                }
                if (result) {

                    // If given old password is Correct.
                    await bcrypt.hash(upadtes.newPassword, Number(process.env.saltRounds), async (err, hash) => {
                        if (err) {
                            console.log(err, "error in hasing changed password");
                            res.send({ "message": "Something went wrong" });
                        }
                        findUser.password = hash;
                        await userModel.findByIdAndUpdate({ _id: ID }, findUser);
                        res.send({ "message": "Account Updated Successfully" });
                    })
                } else {

                    // If given old password is Wrong, rest other things user wants to update will get upadted but not password.
                    await userModel.findByIdAndUpdate({ _id: ID }, upadtes);
                    res.send({ "message": "Account Updated Successfully except password" });
                }
            });
        } else {

            // If user wants to change other things, other than password.
            await userModel.findByIdAndUpdate({ _id: ID }, upadtes);
            res.send({ "message": "Account Updated Successfully" });
        }
    } catch (err) {
        res.send({ "message": "Something went wrong" });
    }
});


// Delete Account   - c r u D
userRouter.delete("/remove/:id", async (req, res) => {
    let ID = req.params.id;
    try {
        await userModel.findByIdAndDelete({ _id: ID });
        res.send({ "message": "Account Deleted Successfully" });
    } catch (err) {
        res.send({ "message": "Something went wrong" });
    }
});

module.exports = { userRouter };