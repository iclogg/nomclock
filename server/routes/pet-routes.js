const express = require("express");
const { check } = require("express-validator");

const {
    getPetById,
    deletePet,
    createPet,
    updatePet,
} = require("../controllers/pet-controllers");

const router = express.Router();

router.get("/:petId", getPetById);
router.delete("/:petId", deletePet);
router.patch("/:petId", updatePet);

router.post("/", [check("name").not().isEmpty()], createPet);

module.exports = router;

/* TODO check that there is error handling for all routes */
