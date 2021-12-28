const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

/* TODO check that all status codes are correct after copy pasting */
// TODO add package (or keep using mongodb? to create unique ids) uuid v4 perhaps?

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
    const error = validationResult(req);
    if (!error.isEmpty()) {
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
    try {
        user = await User.findByIdAndDelete({ userId });
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
    console.log(updatedUser);

    res.status(200).json(updatedUser);
};

exports.login = login;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUserDetails = updateUserDetails;
