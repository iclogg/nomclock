const express = require("express");

const {
    getPetById,
    deletePet,
    createPet,
} = require("../controllers/pet-controllers");

const router = express.Router();

router.get("/:petId", getPetById);

router.delete("/:petId", deletePet);
router.post("/", createPet);

module.exports = router;
