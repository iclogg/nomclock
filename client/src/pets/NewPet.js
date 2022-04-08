import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Typography, Box } from "@mui/material";

import Loading from "../shared/Loading";
import Error from "../shared/Error";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

import { useForm } from "../shared/form/Form";
import PetDetailsForm from "../pets/PetDetailsForm";

const NewPet = () => {
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
            description: "",
            maxMeals: 3,
        },
        validateOnChange: true,
    });

    const history = useHistory();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await sendRequest(
                    "pets",
                    "post",
                    {
                        name: values.name,
                        maxMeals: values.maxMeals,
                        description: values.description,
                        userId: auth.userId,
                    },
                    { authorization: `Bearer ${auth.token}` }
                );
                history.push(`/pets/${response.data._id}`);
            } catch (error) {
                console.log(error);
            }
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
            <Typography variant="h4">Register Your Darling</Typography>{" "}
            <PetDetailsForm
                submitHandler={submitHandler}
                values={values}
                handleInputChange={handleInputChange}
                inputErrors={inputErrors}
            />
        </Box>
    );
};

export default NewPet;
