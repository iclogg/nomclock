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

    let meals;

    try {
        meals = await Meal.find({ pet: petId });
    } catch (err) {
        const error = new HttpError("Could not find any meals!", 500);
        return next(error);
    }

    if (!meals || meals.length === 0) {
        return next(
            new HttpError("Could not find any meals for this darling.", 404)
        );
    }

    meals = meals.map((meal) => meal.toObject({ getters: true }));

    res.json({ meals });
};

/* CREATE */
/* TODO 
create a meal
*/
const createMeal = async (req, res, next) => {
    const { time, comment, feeder, pet } = req.body;

    const createdMeal = new Meal({
        time: new Date(time),
        comment,
        pet,
        feeder,
    });

    try {
        await createdMeal.save();
    } catch (err) {
        const error = new HttpError("Create meal failed 2", 500);

        return next(err);
    }

    res.status(201).json(createdMeal);
};

/* DELETE */
/* delete a meal */

const deleteMeal = async (req, res, next) => {
    /* TODO check that person has permission to delete meal */

    const mealId = req.params.mealId;

    let meal;

    try {
        meal = await Meal.findByIdAndDelete(mealId);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Meal not deleted",
            500
        );
        return next(error);
    }

    if (!meal) {
        const error = new HttpError(
            "Something went wrong. Could not find Meal to be deleted",
            404
        );
        return next(error);
    }

    res.status(200).json({ message: "Meal deleted", deletedMeal: meal._id });
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
exports.getMealsByPetId = getMealsByPetId;
exports.createMeal = createMeal;
exports.deleteMeal = deleteMeal;
exports.updateMeal = updateMeal;
