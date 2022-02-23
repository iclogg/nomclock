import React, { useEffect, useContext, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useParams } from "react-router-dom";

import Input from "../shared/Input";
import NewFamilyMember from "../pets/NewFamilyMember";

import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";
import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

import { useForm } from "../utils/form-hooks";

const UpdatePet = (props) => {
    const { toggleSetIsUpdating, setPet, pet } = props;
    const auth = useContext(AuthContext);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [memberId, setMemberId] = useState("");

    const { sendRequest } = useAxios();

    const petId = useParams().petId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            name: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            maxMeals: {
                value: 1,
                isValid: false,
            },
        },
        false
    );

    useEffect(() => {
        setFormData(
            {
                name: {
                    value: pet.name,
                    isValid: true,
                },
                description: {
                    value: pet.description,
                    isValid: true,
                },
                maxMeals: {
                    value: pet.maxMeals,
                    isValid: true,
                },
            },
            true
        );
        setDataLoaded(true);
    }, [setFormData, pet]);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `pets/${petId}`,
                "patch",
                {
                    name: formState.inputs.name.value,
                    maxMeals: formState.inputs.maxMeals.value,
                    description: formState.inputs.description.value,
                },
                { authorization: `Bearer ${auth.token}` }
            );
            console.log("response delete family member", response);

            setPet(response.data.pet);
            toggleSetIsUpdating();
        } catch (error) {
            console.log(error);
        }
    };

    /* TODO add loading component to render whilst getting data to replace formState.inputs.name.value &&*/
    const deleteFamilyMemberHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `pets/${petId}/family`,
                "delete",
                {
                    memberId,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            console.log("response.data", response.data);

            setMemberId("");
            setPet(response.data.pet);
            toggleSetIsUpdating();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setMemberId(value);
    };

    return (
        dataLoaded && (
            <Box sx={{ mt: "10px" }}>
                <Typography variant="h4">Update Pet</Typography>{" "}
                <form action="" onSubmit={submitHandler}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title."
                        onInput={inputHandler}
                        initialValue={formState.inputs.name.value}
                        initialValid={formState.inputs.name.isValid}
                    />
                    <Input
                        id="maxMeals"
                        element="input"
                        type="number"
                        label="Max meals per day?"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please choose how many meals a day your darling should have."
                        onInput={inputHandler}
                        initialValue={formState.inputs.maxMeals.value}
                        initialValid={formState.inputs.maxMeals.isValid}
                    />
                    <Input
                        id="description"
                        element="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a description (at least 5 characters)"
                        onInput={inputHandler}
                        initialValue={formState.inputs.description.value}
                        initialValid={formState.inputs.description.isValid}
                    />
                    <Button
                        type="submit"
                        disabled={!formState.isValid}
                        color="secondary"
                        variant="contained"
                    >
                        SAVE
                    </Button>
                </form>
                <NewFamilyMember />
                <form>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Name
                            </InputLabel>
                            <Select
                                id="name"
                                label="Name"
                                color="secondary"
                                variant="outlined"
                                value={memberId}
                                type="memberId"
                                onChange={handleInputChange}
                            >
                                {pet.family &&
                                    pet.family.map((member) => {
                                        return (
                                            <MenuItem value={member._id}>
                                                {member.name}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteFamilyMemberHandler}
                    >
                        Remove Family Member
                    </Button>
                </form>
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
