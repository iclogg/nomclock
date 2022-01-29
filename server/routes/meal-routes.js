const express = require("express");

const {
    getMealsByPetId,
    deleteMeal,
    updateMeal,
    updateMeal,
} = require("../controllers/meal-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.use(checkAuth);

router.get("/:petId", getMealsByPetId);
router.delete("/:mealId", deleteMeal);
router.patch("/:mealId", updateMeal); /* needed? */

router.post("/", createMeal);

module.exports = router;

/* TODO check that there is error handling for all routes */