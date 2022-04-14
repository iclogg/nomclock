const HttpError = require("../models/http-error");

const Meal = require("../models/meal");

/* READ */
/* TODO:
meals by pet ID limitation. limited to daily? 5 last? 10 last?
meals by pet and day
*/

const getMealsByPetId = async (req, res, next) => {
    const petId = req.params.petId;

    /* TODO add opional dynamic date range sort to be passed in */
    /*  let dateRange = new Date(new Date().getTime() - 48 * 60 * 60 * 1000);
     */
    let meals;

    try {
        meals = await Meal.find({ pet: petId });
    } catch (err) {
        const error = new HttpError("Could not find any meals!", 500);
        return next(error);
    }

    if (!meals || meals.length === 0) {
        res.status(200);
        res.json({
            message: "Could not find any meals for this darling",
            noMeal: true,
        });
    } else {
        meals = meals.map((meal) => meal.toObject({ getters: true }));

        res.json({ meals });
    }
};

const getLatestMealByPetId = async (req, res, next) => {
    const petId = req.params.petId;

    let meal;

    try {
        meal = await Meal.findOne({ pet: petId }).sort({ time: "-1" });
    } catch (err) {
        const error = new HttpError("Could not find any meals!", 500);
        return next(error);
    }

    if (!meal || meal.length === 0) {
        res.json({
            message: "Could not find any recent meals for this darling.",
            noMeal: true,
        });
    } else {
        res.json({ meal });
    }
};

/* CREATE */
const createMeal = async (req, res, next) => {
    const { time, comment, feeder, pet } = req.body;

    const createdMeal = new Meal({
        time: new Date(time),
        comment,
        pet,
        feeder,
    });

    try {
        await createdMeal.save();
    } catch (err) {
        const error = new HttpError("Create meal failed 2", 500);

        return next(err);
    }

    res.status(201).json(createdMeal);
};

/* DELETE */

const deleteMeal = async (req, res, next) => {
    /* TODO check that person has permission to delete meal */

    const mealId = req.params.mealId;

    let meal;

    try {
        meal = await Meal.findByIdAndDelete(mealId);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong. Meal not deleted",
            500
        );
        return next(error);
    }

    if (!meal) {
        const error = new HttpError(
            "Something went wrong. Could not find Meal to be deleted",
            404
        );
        return next(error);
    }

    res.status(200).json({ message: "Meal deleted", deletedMeal: meal._id });
};

/* UPDATE */
/* TODO update meal needed? perhaps jsut better to delete*/
/* const updateMeal = async (req, res, next) => {};
 */
/* EXPORTS */
exports.getMealsByPetId = getMealsByPetId;
exports.getLatestMealByPetId = getLatestMealByPetId;
exports.createMeal = createMeal;
exports.deleteMeal = deleteMeal;
/* exports.updateMeal = updateMeal; */
