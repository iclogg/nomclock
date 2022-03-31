import React, { useState } from "react";

import useMeals from "../utils/meal-hooks";

import { useForm, Form } from "../shared/Form";

import { TextField, Button, FormGroup } from "@mui/material";

import TimePicker from "@mui/lab/TimePicker";

const NewMeal = ({ mealAddHandler, meals }) => {
    const { addMeal } = useMeals();

    const { values, setValues, handleInputChange } = useForm({
        time: null,
        comment: "",
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await addMeal(mealAddHandler, values.time, values.comment, meals);
            setValues({ time: null, comment: "" });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <FormGroup>
                <TextField
                    id="comment"
                    label="Comment"
                    color="secondary"
                    variant="outlined"
                    name="comment"
                    value={values.comment}
                    onChange={handleInputChange}
                />
                <TimePicker
                    ampm={false}
                    label="Meal Time"
                    value={values.time}
                    name="time"
                    onChange={(newValue) => {
                        setValues({ ...values, time: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button variant="contained" color="secondary" type="submit">
                    Add Meal
                </Button>
            </FormGroup>
        </form>
    );
};

export default NewMeal;
