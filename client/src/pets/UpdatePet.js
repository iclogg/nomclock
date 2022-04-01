import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";

import {
    Button,
    Typography,
    Box,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from "@mui/material";

import TextInput from "../shared/form/TextInput";
import NewFamilyMember from "../pets/NewFamilyMember";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm, Form } from "../shared/form/Form";

const UpdatePet = (props) => {
    const { toggleSetIsUpdating, setPet, pet } = props;
    const auth = useContext(AuthContext);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [memberId, setMemberId] = useState("");

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

            setMemberId("");
            setPet(response.data.pet);
            toggleSetIsUpdating();
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange2 = (e) => {
        const { value } = e.target;
        setMemberId(value);
    };

    return (
        dataLoaded && (
            <Box sx={{ mt: "10px" }}>
                <Typography variant="h4">Update Pet</Typography>{" "}
                <Form action="" onSubmit={submitHandler}>
                    <TextInput
                        label="Name"
                        name="name"
                        /*                         errorText="Please enter a valid title."
                         */
                        value={values.name}
                        onChange={handleInputChange}
                    />
                    <TextInput
                        type="number"
                        label="Max meals per day?"
                        name="maxMeals"
                        /* errorText="Please choose how many meals a day your darling should have." */
                        onChange={handleInputChange}
                        value={values.maxMeals}
                    />

                    <TextInput
                        label="Description"
                        name="description"
                        /*                         errorText="Please enter a description (at least 5 characters)"
                         */
                        value={values.description}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" color="secondary" variant="contained">
                        SAVE
                    </Button>
                </Form>
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
                                onChange={handleInputChange2}
                            >
                                {pet.family &&
                                    pet.family.map((member) => {
                                        return (
                                            <MenuItem
                                                key={member._id}
                                                value={member._id}
                                            >
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
