const express = require("express");

const { getPetById, createPet } = require("../controllers/pet-controllers");

const router = express.Router();

router.get("/:petId", getPetById);

router.post("/", createPet);

module.exports = router;
