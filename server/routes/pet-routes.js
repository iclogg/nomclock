const express = require("express");

const { getPetById } = require("../controllers/pet-controllers");

const router = express.Router();

router.get("/:petId", getPetById);

module.exports = router;
