const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Pet = require("../models/pet");
const User = require("../models/user");
const mongoose = require("mongoose");

// TODO add package (or use mongodb? to create unique ids) uuid v4 perhaps?

// TODO research and implement error handling options

/* READ */
const getPetById = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;
    try {
        pet = await Pet.findById(petId).populate("owner");
    } catch (err) {
        const error = new HttpError("Could not find that pet!", 500);
        return next(error);
    }

    if (!pet) {
        return next(new HttpError("Could not find that pet!", 404));
    }

    res.json({ pet: pet.toObject({ getters: true }) });
};

/* CREATE */
/* TODO check if express validator check and validation result can be moved into their own middleware file and if there is best practise around that */
const createPet = async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, plase check data", 422)
        );
    }

    const { name, description, maxMeals, image } = req.body;

    const createdPet = new Pet({
        name,
        description,
        maxMeals,
        image,
        owner: req.userData.userId,
    });

    let owner;

    console.log(req.userData);

    try {
        owner = await User.findById(req.userData.userId);
    } catch (err) {
        const error = new HttpError("Create pet failed 1", 500);

        return next(err);
    }

    if (!owner) {
        const error = new HttpError("Could not find owner.", 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPet.save({ session: sess });

        owner.pets.push(createdPet); //mongoose behind the scenes established the connection and saves only the id is saved to mpngo

        await owner.save({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError("Create pet failed 2", 500);

        return next(error);
    }

    res.status(201).json(createdPet);
};

/* DELETE */
const deletePet = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;

    try {
        pet = await Pet.findById(petId).populate("owner");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet not deleted",
            500
        );
        return next(error);
    }

    if (!pet) {
        const error = new HttpError(
            "Something went wrong. Could not find pet to be deleted",
            404
        );
        return next(error);
    }
    console.log(pet.owner);

    if (pet.owner.id !== req.userData.userId) {
        const error = new HttpError("You are not the owner.", 401);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        await pet.remove({ session: sess });

        pet.owner.pets.pull(pet);
        await pet.owner.save({ session: sess });

        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet not deleted",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Pet deleted" });
};

/* UPDATE */
/* TODO Ad change owner to change owner */
const updatePet = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, plase check data", 422)
        );
    }

    const petId = req.params.petId;
    const { name, description, maxMeals, image } = req.body;

    let pet;
    try {
        pet = await Pet.findById(petId);
    } catch (err) {
        const error = new HttpError("Something whent wrong", 500);
        return next(error);
    }

    if (pet.owner.toString() !== req.userData.userId) {
        const error = new HttpError("You are not the owner.", 401);
        return next(error);
    }

    pet.name = name;
    pet.description = description;
    pet.maxMeals = maxMeals;
    pet.image = image;

    try {
        await pet.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Pet could not be updated.",
            500
        );
        return next(error);
    }

    res.status(200).json({ pet: pet.toObject({ getters: true }) });
};

/* EXPORTS */
exports.getPetById = getPetById;
exports.createPet = createPet;
exports.deletePet = deletePet;
exports.updatePet = updatePet;
