import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import useMeals from "../utils/meal-hooks";

import Tooltip from "@mui/material/Tooltip";

const DeleteMeal = ({ mealId, meals, mealDeletedHandler }) => {
    const { deleteMeal } = useMeals();

    const submitHandler = async (e) => {
        e.preventDefault();
        deleteMeal(mealId, meals, mealDeletedHandler);
    };

    return (
        <Tooltip title="Delete">
            <IconButton
                sx={{ verticalAlign: "-2.9px", pt: "0" }}
                onClick={submitHandler}
            >
                <DeleteIcon
                    sx={{
                        fontSize: 15,

                        "&:hover": {
                            color: "secondary.dark",
                            cursor: "pointer",
                        },
                    }}
                />
            </IconButton>
        </Tooltip>
    );
};

export default DeleteMeal;
