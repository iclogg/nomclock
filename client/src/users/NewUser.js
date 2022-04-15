import { useContext, useEffect } from "react";

import { Typography, Button, Grid } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import TextInput from "../shared/form/TextInput";
import AuthGrid from "./AuthGrid";

import { useForm, Form } from "../shared/form/Form";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const NewUser = () => {
    const auth = useContext(AuthContext);
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
        /*   setInputErrors, */
        validate,
    } = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validateOnChange: true,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await sendRequest("users", "post", {
                    email: values.email,
                    name: values.name,
                    password: values.password,
                });

                auth.login(response.data.userId, response.data.token);
            } catch (error) {}
        } else {
            console.log("not valid inputs");
        }
    };

    useEffect(() => {
        clearIsLoading();
    }, [clearIsLoading]);

    return (
        <AuthGrid>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <Grid item xs={12}>
                <Typography variant="h4">
                    Enter your details to sign up!
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Form action="" onSubmit={submitHandler}>
                    <TextInput
                        name="name"
                        type="text"
                        label="Name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={inputErrors.name}
                    />
                    <TextInput
                        name="email"
                        type="email"
                        label="Email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={inputErrors.email}
                    />
                    <TextInput
                        name="password"
                        label="Password"
                        value={values.password}
                        type="password"
                        onChange={handleInputChange}
                        error={inputErrors.password}
                    />
                    <Button type="submit" color="secondary" variant="contained">
                        SIGN UP
                    </Button>
                </Form>
            </Grid>
        </AuthGrid>
    );
};

export default NewUser;
