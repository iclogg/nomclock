const express = require("express");

const router = express.Router();

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

router.get("/:petId", (req, res, next) => {
    const petId = req.params.petId;
    const pet = PETS.find((p) => {
        return p.id === petId;
    });
    if (!pet) {
        const err = new Error("Could not find that pet!");
        err.code = 404;
        return next(err);
    }
    console.log("after if");

    res.json({ pet });
});

module.exports = router;
