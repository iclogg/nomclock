const express = require("express");

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

router.post("/", createPet);

module.exports = router;
