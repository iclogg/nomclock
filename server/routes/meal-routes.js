const express = require("express");
const { check } = require("express-validator");

const {
    getMealsByPetId,
    deleteMeal,
    /*updateMeal,*/
    createMeal,
    getLatestMealByPetId,
} = require("../controllers/meal-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:petId/latest", checkAuth, getLatestMealByPetId);

router.get("/:petId", checkAuth, getMealsByPetId);
router.delete("/:mealId", checkAuth, deleteMeal);
router.post(
    "/",
    checkAuth,
    [
        check("comment").trim().escape(),
        check("time").isISO8601(),
        check("feeder").isMongoId(),
        check("pet").isMongoId(),
    ],
    createMeal
);

/* TODO: needed? */
/* router.patch("/:mealId", checkAuth, updateMeal); */

module.exports = router;
