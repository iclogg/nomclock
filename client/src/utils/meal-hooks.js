import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const useMeals = () => {
    const auth = useContext(AuthContext);
    const { sendRequest } = useAxios();
    const { petId } = useParams();

    const addMeal = async (mealAddHandler, time, comment, meals) => {
        let rawTime;

        if (time === null) {
            rawTime = new Date();
        } else if (typeof time === "string") {
            rawTime = new Date();
            rawTime.setMinutes(0);
            rawTime.setSeconds(0);
            rawTime.setHours(time);
        } else {
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

            mealAddHandler(updatedMeals);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteMeal = async (mealId, meals, mealDeletedHandler) => {
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

                mealDeletedHandler(updatedMeals);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteMeal, addMeal };
};

export default useMeals;
