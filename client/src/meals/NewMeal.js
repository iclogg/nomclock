import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TimePicker from "@mui/lab/TimePicker";

const NewMeal = ({ mealAddHandler, meals }) => {
    const auth = useContext(AuthContext);
    const [time, setTime] = useState(null);
    const [comment, setComment] = useState("");

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(comment, time);
        let rawTime;
        if (time === null) {
            rawTime = new Date();
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
            setTime(null);
            setComment("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setComment(value);
    };

    return (
        <form>
            <FormGroup>
                <TextField
                    id="comment"
                    label="Comment"
                    color="secondary"
                    variant="outlined"
                    value={comment}
                    onChange={handleInputChange}
                />
                <TimePicker
                    ampm={false}
                    label="Meal Time"
                    value={time}
                    onChange={(newValue) => {
                        setTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={submitHandler}
                >
                    Add Meal
                </Button>
            </FormGroup>
        </form>
    );
};

export default NewMeal;
