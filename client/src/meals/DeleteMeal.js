import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import useMeals from "../utils/meal-hooks";

import Tooltip from "@mui/material/Tooltip";

const DeleteMeal = ({ mealId, meals, mealsUpdateHandler }) => {
    const { deleteMeal } = useMeals();

    const submitHandler = async (e) => {
        e.preventDefault();
        deleteMeal(mealId, meals, mealsUpdateHandler);
    };

    return (
        <Tooltip title="Delete">
            <IconButton
                sx={{ verticalAlign: "-1.5px", pt: "0", pl: "2px" }}
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
