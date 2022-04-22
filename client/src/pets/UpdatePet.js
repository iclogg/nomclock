import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Typography, Paper, Button, Box } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import NewFamilyMember from "../pets/NewFamilyMember";
import RemoveFamilyMember from "../pets/RemoveFamilyMember";
import PetDetailsForm from "../pets/PetDetailsForm";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm } from "../shared/form/Form";

const UpdatePet = (props) => {
    const { petUpdateHandler, pet, handleOpenDeleteModal } = props;
    const [saveBtnStatus, setSaveBtnStatus] = useState("initial");

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
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not valid inputs");
        }
    };

    // Fix for setting saveBtn status
    // TODO Check if there is a way to not have the component remount after update and not to have values or handle change run directely on mount. Behavior changed after I refactored to use the tabs to swap between update and pet component.
    useEffect(() => {
        if (saveBtnStatus === "initial") {
            setSaveBtnStatus(true);
        } else {
            setSaveBtnStatus(false);
        }
    }, [values]);
    //

    return (
        <Paper>
            <PetDetailsForm
                submitHandler={submitHandler}
                values={values}
                handleInputChange={handleInputChange}
                inputErrors={inputErrors}
                saveBtnStatus={saveBtnStatus}
            >
                <Typography isformtitle="true">Pet Details</Typography>
            </PetDetailsForm>
            <NewFamilyMember petUpdateHandler={petUpdateHandler} />
            {!!pet.family.length && (
                <RemoveFamilyMember
                    petUpdateHandler={petUpdateHandler}
                    pet={pet}
                />
            )}
            <Box p={3} display="flex" justifyContent="center">
                <Box
                    sx={{
                        maxWidth: "800px",
                        display: "flex",
                        flexGrow: 1,
                        justifyContent: "flex-end",
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleOpenDeleteModal}
                    >
                        Remove Pet
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UpdatePet;
