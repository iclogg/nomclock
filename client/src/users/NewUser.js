import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Box, Button } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import TextInput from "../shared/form/TextInput";

import { useForm, Form } from "../shared/form/Form";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const NewUser = () => {
    const history = useHistory();

    const auth = useContext(AuthContext);
    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

    const { values, handleInputChange } = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest("users", "post", {
                email: values.email,
                name: values.name,
                password: values.password,
            });

            auth.login(response.data.userId, response.data.token);
            history.push("/");
        } catch (error) {}
    };

    useEffect(() => {
        clearIsLoading();
    }, [clearIsLoading]);

    return (
        <Box sx={{ mt: "10px" }}>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Typography variant="h4">Enter your details to sign up!</Typography>
            <Form action="" onSubmit={submitHandler}>
                <TextInput
                    name="name"
                    type="text"
                    label="Name"
                    value={values.name}
                    errorText="Please enter a valid name."
                    onChange={handleInputChange}
                />
                <TextInput
                    name="email"
                    type="email"
                    label="Email"
                    value={values.email}
                    errorText="Please enter valid email"
                    onChange={handleInputChange}
                />
                <TextInput
                    name="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    errorText="Please enter a password (at least 6 characters)"
                    onChange={handleInputChange}
                />
                <Button type="submit" color="secondary" variant="contained">
                    SIGN UP
                </Button>
            </Form>
        </Box>
    );
};

export default NewUser;
