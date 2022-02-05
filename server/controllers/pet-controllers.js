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
        pet = await Pet.findById(petId)
            .populate("owner", "-password")
            .populate("family", "-password -pets");
    } catch (err) {
        const error = new HttpError("Could not find that pet!", 500);
        return next(error);
    }

    if (!pet) {
        return next(new HttpError("Could not find that pet!", 404));
    }

    res.json({ pet: pet.toObject({ getters: true }) });
};

const getPetsByOwner = async (req, res, next) => {
    const ownerId = req.params.uid;

    let pets;
    let owner;
    try {
        owner = await User.findById(ownerId, "-password").populate("pets");
    } catch (err) {
        const error = new HttpError("Could not find pets!", 500);
        return next(error);
    }

    if (!owner || owner.pets.length === 0) {
        return next(new HttpError("Could not find pets for this owner.", 404));
    }

    pets = owner.pets.map((pet) => pet.toObject({ getters: true }));

    res.json({ pets });
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
        pet = await Pet.findById(petId).populate("owner", "-password");
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
            "Something went wrong. Pet  not deleted",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Pet deleted" });
};

const deleteFamilyMember = async (req, res, next) => {
    /* TODO check that person has permission to delete meal */
    console.log("delete familymenber");

    const petId = req.params.petId;
    const { email } = req.body;

    let pet;

    try {
        pet = await Pet.updateOne(
            { _id: { petId } },
            { $pullAll: { family: [email] } }
        );
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Family member not deleted",
            500
        );
        return next(error);
    }

    console.log("pet", pet);

    if (!pet) {
        const error = new HttpError(
            "Something went wrong. Could not find pet",
            404
        );
        return next(error);
    }

    res.status(200).json({ message: "Family member deleted" });
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
    //TODO file upload and image save
    /*  pet.image = image ; */

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

const addFamilyMember = async (req, res, next) => {
    const petId = req.params.petId;
    const { email } = req.body;

    console.log("email", email);
    console.log("petId", petId);

    let pet;
    let newMember;
    try {
        pet = await Pet.findById(petId);
    } catch (err) {
        const error = new HttpError("Something whent wrong", 500);
        console.log(err);

        return next(error);
    }
    console.log("pet", pet);

    try {
        newMember = await User.findOne({ email }, "-password -pets");
    } catch (err) {
        const error = new HttpError("Something went wrong", 500);
        return next(error);
    }
    console.log("member", newMember);

    if (!newMember) {
        const error = new HttpError(
            "Sorry could not find any user with that email.",
            401
        );
        return next(error);
    }

    pet.family.push(newMember);

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
exports.getPetsByOwner = getPetsByOwner;
exports.createPet = createPet;
exports.deletePet = deletePet;
exports.updatePet = updatePet;
exports.addFamilyMember = addFamilyMember;
exports.deleteFamilyMember = deleteFamilyMember;
