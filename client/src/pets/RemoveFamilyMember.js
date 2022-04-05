import { useContext } from "react";
import { useParams } from "react-router-dom";

import {
    Button,
    Box,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
} from "@mui/material";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm, Form } from "../shared/form/Form";

export const RemoveFamilyMember = ({ pet, petUpdateHandler }) => {
    const auth = useContext(AuthContext);
    const { values, setValues, handleInputChange } = useForm({
        initialValues: {
            memberId: "",
        },
    });

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `pets/${petId}/family`,
                "delete",
                {
                    memberId: values.memberId,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            setValues({
                memberId: "",
            });
            petUpdateHandler(response.data.pet);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form action="" onSubmit={submitHandler}>
            <Box sx={{ minWidth: "110px" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                    <Select
                        id="name"
                        label="Name"
                        color="secondary"
                        variant="outlined"
                        name="memberId"
                        value={values.memberId}
                        type="memberId"
                        onChange={handleInputChange}
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
            <Button type="submit" variant="contained" color="secondary">
                Remove Family Member
            </Button>
        </Form>
    );
};

export default RemoveFamilyMember;
