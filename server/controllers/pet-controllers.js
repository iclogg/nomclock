const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Pet = require("../models/pet");

/* TODO remove dummy pet once backen is up */
let PETS = [
    {
        id: "pet1",
        name: "Lucifer",
        image: "/lucifer.png",
        description: "Best kitten EVER!!!!",
        maxMeals: 3,
    },
    {
        id: "pet2",
        name: "Mumman",
        image: "/lucifer.png",
        description: "Absolutely most superior kitten EVER!!!!",
        maxMeals: 6,
    },
];

// TODO add package (or use mongodb? to create unique ids) uuid v4 perhaps?

// TODO research and implement error handling options

/* READ */
const getPetById = async (req, res, next) => {
    const petId = req.params.petId;

    let pet;
    try {
        pet = await Pet.findById(petId);
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
    });
    try {
        await createdPet.save();
    } catch (err) {
        const error = new HttpError("Create pet failed", 500);
        return next(error);
    }

    res.status(201).json(createdPet);
};

/* DELETE */
const deletePet = (req, res, next) => {
    const petId = req.params.petId;

    PETS = PETS.filter((pet) => pet.id !== petId);
    res.status(200).json();
};

/* UPDATE */
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
