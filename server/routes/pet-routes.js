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

router.get("/owner/:uid", checkAuth, getPetsByOwner);
router.post("/:petId/family", checkAuth, addFamilyMember);
router.delete("/:petId/family", checkAuth, deleteFamilyMember);
router.get("/:petId", checkAuth, getPetById);
router.delete("/:petId", checkAuth, deletePet);
router.patch(
    "/:petId",
    checkAuth,
    [
        check("name").not().isEmpty().trim().escape(),
        check("description").not().isEmpty().trim().escape(),
        check("maxMeals").isInt({ min: 1, max: 99 }),
    ],
    updatePet
);

router.post(
    "/",
    checkAuth,
    [
        check("name").not().isEmpty().trim().escape(),
        check("description").not().isEmpty().trim().escape(),
        check("maxMeals").isInt({ min: 1, max: 99 }),
    ],
    createPet
);

module.exports = router;
