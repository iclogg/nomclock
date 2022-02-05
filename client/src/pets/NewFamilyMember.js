import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";

const NewFamilyMember = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState("");

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `pets/${petId}/family`,
                "post",
                {
                    email,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            console.log("response.data", response.data);

            setEmail("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setEmail(value);
    };

    return (
        <form>
            <FormGroup>
                <TextField
                    id="email"
                    label="Email"
                    color="secondary"
                    variant="outlined"
                    value={email}
                    type="email"
                    onChange={handleInputChange}
                />

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={submitHandler}
                >
                    Add Member
                </Button>
            </FormGroup>
        </form>
    );
};

export default NewFamilyMember;
