import { useEffect, useContext } from "react";
import { Typography, Button, Grid } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import TextInput from "../shared/form/TextInput";
import AuthGrid from "./AuthGrid";

import { useForm, Form } from "../shared/form/Form";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const Login = () => {
    const blah = "blah";
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
                <Form action="" onSubmit={submitHandler}>
                    <Typography align="left" variant="h6">
                        Enter your details to log in!
                    </Typography>
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
            </Grid>
        </AuthGrid>
    );
};

export default Login;
