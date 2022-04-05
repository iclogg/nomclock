import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Box, Button } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import TextInput from "../shared/form/TextInput";

import { useForm, Form } from "../shared/form/Form";

import inputValidator from "../shared/form/validators";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const Login = () => {
    const blah = "blah";
    const auth = useContext(AuthContext);
    const history = useHistory();
    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

    const {
        values,
        handleInputChange,
        inputErrors,
        setInputErrors,
        validate,
    } = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validateOnChange: true,
    });

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await sendRequest("users/login", "post", {
                    email: values.email,
                    password: values.password,
                });

                auth.login(response.data.userId, response.data.token);
                history.push("/");
            } catch (error) {}
        } else {
            console.log("not valid inputs");
        }
    };

    useEffect(() => {
        clearIsLoading();
    }, [clearIsLoading]);

    return (
        <Box sx={{ mt: "10px" }}>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Typography variant="h4">Enter your details to log in!</Typography>
            <Form action="" onSubmit={submitHandler}>
                <TextInput
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleInputChange}
                    error={inputErrors.email}
                />
                <TextInput
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleInputChange}
                />
                <Button type="submit" color="secondary" variant="contained">
                    LOG IN
                </Button>
            </Form>
        </Box>
    );
};

export default Login;
