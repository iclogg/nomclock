import { useEffect, useContext } from "react";
import { Typography, Button } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";
import TextInput from "../shared/form/TextInput";
import AuthGrid from "../layout/AuthGrid";

import { useForm, Form } from "../shared/form/Form";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const Login = () => {
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

            <Form action="" onSubmit={submitHandler}>
                <Typography isformtitle="true">LOGIN</Typography>
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
        </AuthGrid>
    );
};

export default Login;
