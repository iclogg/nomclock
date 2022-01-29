const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Pet = require("../models/pet");
const User = require("../models/user");
const Meal = require("../models/meal");
const mongoose = require("mongoose");

/* TODO!!!!!
Current is a copy of pet controllers update everything!!! */

/* READ */
/* Needed:
meals by pet ID (limited to daily? 5 last? 10 last?)
meals by pet and day
*/

const getMealsByPetId = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;
    try {
        pet = await Pet.findById(petId).populate("owner", "-password");
    } catch (err) {
        const error = new HttpError("Could not find that pet!", 500);
        return next(error);
    }

    if (!pet) {
        return next(new HttpError("Could not find that pet!", 404));
    }

    res.json({ pet: pet.toObject({ getters: true }) });
};

const getMealsByPetId = async (req, res, next) => {
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
/* TODO 
create a meal
*/
const createMeal = async (req, res, next) => {
    const { time, comment, feeder } = req.body;

    const petId = req.params.petId;

    const createdMeal = new Meal({
        time,
        comment,
        pet: req.params.petId,
        feeder,
    });

    let pet;

    try {
        await createMeal.save();
    } catch (err) {
        const error = new HttpError("Create meal failed 2", 500);

        return next(error);
    }

    res.status(201).json(createdMeal);
};

/* DELETE */
/* delete a meal */

const deleteMeal = async (req, res, next) => {
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

/* UPDATE */
/* TODO update meal needed? perhaps jsut better to delete*/
const updateMeal = async (req, res, next) => {
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

/* EXPORTS */
exports.getMealByPetId = getMealByPetId;
exports.createMeal = createMeal;
exports.deleteMeal = deleteMeal;
exports.updateMeal = updateMeal;