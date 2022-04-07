const express = require("express");

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
router.delete("/:mealId", deleteMeal); /* needed? */
/* router.patch("/:mealId", updateMeal); */ router.post("/", createMeal);

module.exports = router;

/* TODO check that there is error handling for all routes */
