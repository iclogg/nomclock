const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user");
const Pet = require("../models/pet");

/* TODO check that all status codes are correct after copy pasting */

/* READ */
// TODO consider password library passport (local mongoose).
// TODO Create logout route
const login = async (req, res, next) => {
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

    if (!exsitingUser || exsitingUser.password !== password) {
        return next(new HttpError("No user found.", 401));
    }

    /* TODO! obs return now includes dummy pw */
    res.status(200).json(exsitingUser);
};

/* CREATE */
const createUser = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        const error = new HttpError(
            "Invalid inputs passed, please check data",
            422
        );
        return next(error);
    }

    const { name, email } = req.body;

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

    const createdUser = new User({
        name,
        email,
        password: "dummypw",
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
    /* TODO! obs return now includes dummy pw */
    res.status(201).json(createdUser.toObject({ getters: true }));
};

/* DELETE */
const deleteUser = async (req, res, next) => {
    userId = req.params.userId;
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

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        const deletedPetsN = await Pet.deleteMany(
            { owner: user._id },
            { session: sess }
        );
        console.log(deletedPetsN);

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
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const error = HttpError(
            "Invalid inputs passed, please check data",
            422
        );
        return next(error);
    }

    const userId = req.params.userId;
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

    res.status(200).json(updatedUser);
};

exports.login = login;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUserDetails = updateUserDetails;
