const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

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
let idCount = 2;

/* READ */
const getPetById = (req, res, next) => {
    const petId = req.params.petId;
    const pet = PETS.find((p) => {
        return p.id === petId;
    });
    if (!pet) {
        return next(new HttpError("Could not find that pet!", 404));
    }

    res.json({ pet });
};

/* CREATE */
/* TODO check if express validator check and validation result can be moved into their own middleware file and if there is best practise around that */
const createPet = (req, res, next) => {
    const error = validationResult(req);
    if (error) {
        throw new HttpError("Invalid inputs passed, plase check data", 422);
    }
    const { name, description, maxMeals, image } = req.body;

    idCount += 1;
    const createdPet = {
        id: `pet${idCount}`,
        name,
        description,
        maxMeals,
        image,
    };

    PETS.push(createdPet);
    res.status(201).json(createdPet);
};

/* DELETE */
const deletePet = (req, res, next) => {
    const petId = req.params.petId;

    PETS = PETS.filter((pet) => pet.id !== petId);
    res.status(200).json();
};

/* UPDATE */
const updatePet = (req, res, next) => {
    const error = validationResult(req);
    if (error) {
        throw new HttpError("Invalid inputs passed, plase check data", 422);
    }

    const petId = req.params.petId;
    const { name, description, maxMeals, image } = req.body;

    const updatedPet = { ...PETS.find((pet) => pet.id === petId) };
    const index = PETS.findIndex((pet) => pet.id === petId);

    updatedPet.name = name;
    updatedPet.description = description;
    updatedPet.maxMeals = maxMeals;
    updatedPet.image = image;

    PETS[index] = updatedPet;

    res.status(200).json({ pet: updatedPet });
};

/* EXPORTS */
exports.getPetById = getPetById;
exports.createPet = createPet;
exports.deletePet = deletePet;
exports.updatePet = updatePet;