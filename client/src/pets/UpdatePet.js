import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Typography, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import NewFamilyMember from "../pets/NewFamilyMember";
import RemoveFamilyMember from "../pets/RemoveFamilyMember";
import PetDetailsForm from "../pets/PetDetailsForm";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm } from "../shared/form/Form";

const UpdatePet = (props) => {
    const { toggleSetIsUpdating, petUpdateHandler, pet } = props;

    const auth = useContext(AuthContext);

    const { values, handleInputChange, inputErrors, validate } = useForm({
        initialValues: {
            name: pet.name,
            description: pet.description,
            maxMeals: pet.maxMeals,
        },
        validateOnChange: true,
    });

    const { sendRequest } = useAxios();

    const petId = useParams().petId;

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await sendRequest(
                    `pets/${petId}`,
                    "patch",
                    {
                        name: values.name,
                        maxMeals: values.maxMeals,
                        description: values.description,
                    },
                    { authorization: `Bearer ${auth.token}` }
                );

                petUpdateHandler(response.data.pet);
                setUpdateConfirmation(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not valid inputs");
        }
    };

    //update confirmation Icon
    const [showUpdateConfirmation, setUpdateConfirmation] = useState(false);
    useEffect(() => {
        if (showUpdateConfirmation) {
            setUpdateConfirmation(false);
        }
    }, [values]);
    //

    return (
        <Box sx={{ mt: "10px" }}>
            <Typography
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    height: "1em",
                }}
            >
                {" "}
                {showUpdateConfirmation && (
                    <span>
                        <CheckCircleOutlineIcon
                            sx={{ verticalAlign: "-6px" }}
                        />{" "}
                        Updates saved!
                    </span>
                )}
            </Typography>
            <PetDetailsForm
                submitHandler={submitHandler}
                values={values}
                handleInputChange={handleInputChange}
                inputErrors={inputErrors}
            >
                <Typography isformtitle="true">Pet Details</Typography>
            </PetDetailsForm>
            <NewFamilyMember
                petUpdateHandler={petUpdateHandler}
                toggleSetIsUpdating={toggleSetIsUpdating}
            />
            {!!pet.family.length && (
                <RemoveFamilyMember
                    petUpdateHandler={petUpdateHandler}
                    pet={pet}
                />
            )}
            <Button
                sx={{ mt: 3 }}
                onClick={toggleSetIsUpdating}
                color="secondary"
            >
                Done
            </Button>
        </Box>
    );
};

export default UpdatePet;
