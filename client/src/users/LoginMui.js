import React, { useEffect, useContext } from "react";

import { Button } from "../shared/Button";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import { VALIDATOR_REQUIRE } from "../utils/validators";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useHistory } from "react-router-dom";

import FormGroup from "@mui/material/FormGroup";

const Login = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
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
            const response = await sendRequest("users/login", "post", {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            });

            auth.login(response.data.userId, response.data.token);
            history.push("/");
        } catch (error) {}
    };

    useEffect(() => {
        clearIsLoading();
    }, [clearIsLoading]);

    return (
        <div>
            {isLoading && <Loading />}
            {error && <Error message={error} onClick={clearError} />}
            <h2>Enter your details to log in!</h2>
            <form action="" onSubmit={submitHandler}>
                <FormGroup>
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please your email"
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        label="Password"
                        validators=""
                        type="password"
                        errorText="Enter your password"
                        onInput={inputHandler}
                    />
                </FormGroup>
                <Button type="submit" disabled={!formState.isValid}>
                    LOG IN
                </Button>
            </form>
        </div>
    );
};

export default Login;
