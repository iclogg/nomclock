const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Pet = require("../models/pet");

/* TODO check that all status codes are correct after copy pasting */

/* READ */
// TODO consider password library passport (local mongoose).
const login = async (req, res, next) => {
    console.log("Login server");

    const { password, email } = req.body;

    let exsitingUser;

    try {
        exsitingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            "Login failed. Please try again later.",
            500
        );
        return next(error);
    }

    if (!exsitingUser) {
        return next(new HttpError("Invalid credentials.", 403));
    }

    let isValidPw;
    try {
        isValidPw = await bcrypt.compare(password, exsitingUser.password);
    } catch (error) {
        return next(
            new HttpError(
                "Login failed. Please check credentials and try again later.",
                500
            )
        );
    }

    if (!isValidPw) {
        return next(new HttpError("Invalid credentials.", 403));
    }

    let token;
    try {
        token = jwt.sign({ userId: exsitingUser.id }, process.env.JWT_KEY, {
            expiresIn: "3h",
        });
    } catch (err) {
        const error = new HttpError(
            "Signup failed. Please try again later.",
            500
        );
        return next(error);
    }

    /* TODO populate users pets and send */
    res.json({ userId: exsitingUser.id, token });
};

const getUserFamilies = async (req, res, next) => {
    userId = req.userData.userId;
    let pets;

    try {
        pets = await Pet.find({ family: userId });
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. User not deleted",
            500
        );
        return next(error);
    }

    console.log("user families", pets);

    if (!pets || pets.length === 0) {
        console.log("woop");

        res.json({
            message: "No extended pet family found.",
            noFamily: true,
        });
    } else {
        pets = pets.map((pet) => pet.toObject({ getters: true }));
        res.json({ pets });
    }
};

/* CREATE */
const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    let exsitingUser;
    try {
        exsitingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            "Signup failed. Please try again later.",
            500
        );
        return next(error);
    }

    if (exsitingUser) {
        const error = new HttpError("User already exists.", 422);
        return next(error);
    }

    let hashedPw;

    try {
        hashedPw = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError(
            "Signup failed. Please try again later.",
            500
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password: hashedPw,
    });
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            "Signup failed. Please try again later.",
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign({ userId: createdUser.id }, process.env.JWT_KEY, {
            expiresIn: "1h",
        });
    } catch (err) {
        const error = new HttpError(
            "Signup failed. Please try again later.",
            500
        );
        return next(error);
    }

    res.json({ userId: createdUser.id, token });
};

/* DELETE */
const deleteUser = async (req, res, next) => {
    userId = req.userData.userId;
    let user;
    //TODO consider using fidnbyidanddelete and and removing one trycatch block

    try {
        user = await User.findById(userId).populate("pets");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. User not deleted",
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "Something went wrong. Could not find user to be deleted",
            404
        );
        return next(error);
    }

    let updatedFamilies;

    try {
        updatedFamilies = await Pet.updateMany(
            { family: userId },
            { $pullAll: { family: [userId] } }
        );
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. User not deleted",
            500
        );
        console.log(err);

        return next(error);
    }

    if (!user) {
        const error = new HttpError(
            "Something went wrong. Could not find user to be deleted",
            404
        );
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        const deletedPetsN = await Pet.deleteMany(
            { owner: user._id },
            { session: sess }
        );

        await user.remove({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. User not deleted",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "User deleted" });
};

/* UPDATE */
const updateUserDetails = async (req, res, next) => {
    const userId = req.userData.userId;
    const { name, email } = req.body;

    let updatedUser;
    try {
        updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        );
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. User not updated",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "User updated" });
};

exports.login = login;
exports.getUserFamilies = getUserFamilies;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUserDetails = updateUserDetails;
