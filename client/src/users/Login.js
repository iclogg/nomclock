import React, { useEffect, useContext } from "react";

import Input from "../shared/Input";
import Button from "../shared/Button";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

import { VALIDATOR_REQUIRE } from "../utils/validators";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

import { useForm } from "../utils/form-hooks";

const Login = () => {
    const auth = useContext(AuthContext);
    const {
        sendRequest,
        clearError,
        clearIsLoading,
        isLoading,
        error,
    } = useAxios();

    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await sendRequest("users/login", "post", {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            });

            auth.login(response.data.userId, response.data.token);
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
                <Button type="submit" disabled={!formState.isValid}>
                    LOG IN
                </Button>
            </form>
        </div>
    );
};

export default Login;
