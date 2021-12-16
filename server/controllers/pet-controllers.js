const HttpError = require("../models/http-error");

/* TODO remove dummy pet once backen is up */
const PETS = [
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

exports.getPetById = getPetById;
