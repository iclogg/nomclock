import React, { useState, useContext } from "react";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";

const NewMeal = () => {
    const auth = useContext(AuthContext);

    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest(
                "meals",
                "post",
                {
                    date: new Date(),
                    comment: "a comment",
                    feeder: auth.userId,
                },
                { authorization: `Bearer ${auth.token}` }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form>
            <FormGroup>
                <TextField
                    id="comment"
                    label="Comment"
                    color="secondary"
                    variant="outlined"
                />
            </FormGroup>
        </form>
    );
};

export default NewMeal;
