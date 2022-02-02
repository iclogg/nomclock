import React, { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import useAxios from "../utils/axios-hook";
import { AuthContext } from "../utils/auth-context";

const DeleteMeal = ({ mealId, meals, mealDeletedHandler }) => {
    const { sendRequest } = useAxios();
    const auth = useContext(AuthContext);

    const deleteMeal = async (e) => {
        e.preventDefault();

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

    return (
        <DeleteIcon
            onClick={deleteMeal}
            sx={{
                fontSize: 17,
                verticalAlign: "text-top",
                "&:hover": {
                    color: "secondary.dark",
                    cursor: "pointer",
                },
            }}
        />
    );
};

export default DeleteMeal;
