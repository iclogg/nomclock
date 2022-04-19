import { useContext, useEffect } from "react";

import { Typography, Button, Grid, Paper } from "@mui/material";

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

    const { values, handleInputChange, inputErrors, validate } = useForm({
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

            {/*      <Grid xs={12} sm={10} pt={10}>
                <Typography
                    align="center"
                    variant="h1"
                    sx={{
                        fontFamily: "Shadows Into Light, cursive",
                        fontWeight: "bold",
                        color: "#e81e62",
                        textShadow: "5px 1px 5px white",
                    }}
                >
                    <Typography variant="h6">WELCOME TO </Typography> NOMCLOCK{" "}
                </Typography>
            </Grid> */}

            {/*      <Grid item xs={10} md="auto" mb={20}>
                <Paper
                    elevation={8}
                    sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
                > */}
            <Form action="" onSubmit={submitHandler}>
                <Typography isformtitle="true">SIGNUP</Typography>
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
        </AuthGrid>
    );
};

export default NewUser;
