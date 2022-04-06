import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const useMeals = () => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
    const { petId } = useParams();

    const getMeals = async (mealsUpdateHandler) => {
        let preppedMeals;
        try {
            const response = await sendRequest(
                `meals/${petId}`,
                "get",
                {},
                { authorization: "Bearer " + auth.token }
            );

            if (!response.data.noMeal) {
                preppedMeals = [...response.data.meals].sort((x, y) => {
                    return new Date(x.time) - new Date(y.time);
                });

                preppedMeals = preppedMeals.filter((meal) => {
                    let mealDate = new Date(meal.time);
                    let today = new Date();

                    return (
                        mealDate.setHours(0, 0, 0, 0) ===
                        today.setHours(0, 0, 0, 0)
                    );
                });

                mealsUpdateHandler(preppedMeals);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const addMeal = async (mealsUpdateHandler, time, comment, meals) => {
        let rawTime;

        if (time === null) {
            //for no time given
            rawTime = new Date();
        } else if (typeof time === "string") {
            //for meal added in clock
            rawTime = new Date();
            rawTime.setMinutes(0);
            rawTime.setSeconds(0);
            rawTime.setHours(time);
        } else {
            //for time given
            rawTime = time.toDate();
        }

        try {
            const response = await sendRequest(
                "meals",
                "post",
                {
                    time: rawTime,
                    comment,
                    feeder: auth.userId,
                    pet: petId,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            let updatedMeals = [...meals, response.data].sort((x, y) => {
                return new Date(x.time) - new Date(y.time);
            });

            mealsUpdateHandler(updatedMeals);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMeal = async (mealId, meals, mealsUpdateHandler) => {
        try {
            const response = await sendRequest(
                `meals/${mealId}`,
                "delete",
                {},
                { authorization: `Bearer ${auth.token}` }
            );

            if (response.data.message === "Meal deleted") {
                let updatedMeals = [...meals].filter((meal) => {
                    return meal._id !== response.data.deletedMeal;
                });

                mealsUpdateHandler(updatedMeals);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteMeal, addMeal, getMeals };
};

export default useMeals;
