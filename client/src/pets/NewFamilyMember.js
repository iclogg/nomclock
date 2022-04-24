import { Button, Typography } from "@mui/material";

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm, Form } from "../shared/form/Form";

import TextInput from "../shared/form/TextInput";

const NewFamilyMember = ({ petUpdateHandler }) => {
    const auth = useContext(AuthContext);

    const {
        values,
        setValues,
        handleInputChange,
        inputErrors,
        validate,
    } = useForm({
        initialValues: {
            email: "",
        },
        validateOnChange: true,
    });

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await sendRequest(
                    `pets/${petId}/family`,
                    "post",
                    {
                        email: values.email,
                    },
                    { authorization: `Bearer ${auth.token}` }
                );

                setValues({
                    email: "",
                });
                petUpdateHandler(response.data.pet);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not valid inputs");
        }
    };

    return (
        <Form action="" onSubmit={submitHandler}>
            <Typography isformtitle="true">Pet Family</Typography>
            <TextInput
                name="email"
                type="email"
                label="Email"
                value={values.email}
                onChange={handleInputChange}
                type="email"
                error={inputErrors.email}
            />
            <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={!values.email || !!inputErrors.email}
            >
                Add Family Member
            </Button>
        </Form>
    );
};

export default NewFamilyMember;
