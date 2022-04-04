import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Typography, Box } from "@mui/material";

import NewFamilyMember from "../pets/NewFamilyMember";
import RemoveFamilyMember from "../pets/RemoveFamilyMember";
import PetDetailsForm from "../pets/PetDetailsForm";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm } from "../shared/form/Form";

const UpdatePet = (props) => {
    const { toggleSetIsUpdating, petUpdateHandler, pet } = props;
    const auth = useContext(AuthContext);
    const [dataLoaded, setDataLoaded] = useState(false);

    const { values, handleInputChange } = useForm({
        name: pet.name,
        description: pet.description,
        maxMeals: pet.maxMeals,
    });

    const { sendRequest } = useAxios();

    const petId = useParams().petId;

    useEffect(() => {
        setDataLoaded(true);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

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
    };

    return (
        dataLoaded && (
            <Box sx={{ mt: "10px" }}>
                <Typography variant="h4">Update Pet</Typography>{" "}
                <PetDetailsForm
                    submitHandler={submitHandler}
                    values={values}
                    handleInputChange={handleInputChange}
                />
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
        )
    );
};

export default UpdatePet;
