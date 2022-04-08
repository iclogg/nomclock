const express = require("express");
const { check } = require("express-validator");

const {
    getMealsByPetId,
    deleteMeal,
    /*     updateMeal,
     */ createMeal,
    getLatestMealByPetId,
} = require("../controllers/meal-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/:petId/latest", getLatestMealByPetId);

router.get("/:petId", getMealsByPetId);
router.delete("/:mealId", deleteMeal);
router.post(
    "/",
    [
        check("comment").trim().escape(),
        check("time").isISO8601(),
        check("feeder").isMongoId(),
        check("pet").isMongoId(),
    ],
    createMeal
);

/* needed? */
/* router.patch("/:mealId", updateMeal); */

module.exports = router;

/* TODO check that there is error handling for all routes */
