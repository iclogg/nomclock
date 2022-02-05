const express = require("express");
const { check } = require("express-validator");

const {
    getPetById,
    getPetsByOwner,
    deletePet,
    createPet,
    updatePet,
    addFamilyMember,
    deleteFamilyMember,
} = require("../controllers/pet-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/owner/:uid", getPetsByOwner);
router.post("/:petId/family", addFamilyMember);
router.delete("/:petId/family", deleteFamilyMember);
router.get("/:petId", getPetById);
router.delete("/:petId", deletePet);
router.patch("/:petId", [check("name").not().isEmpty()], updatePet);

router.post("/", [check("name").not().isEmpty()], createPet);

module.exports = router;

/* TODO check that there is error handling for all routes */
