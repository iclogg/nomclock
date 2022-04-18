import { useContext } from "react";
import { useParams } from "react-router-dom";

import {
    Button,
    MenuItem,
    FormControl,
    Select,
    InputLabel,
    FormHelperText,
} from "@mui/material";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm, Form } from "../shared/form/Form";

export const RemoveFamilyMember = ({ pet, petUpdateHandler }) => {
    const auth = useContext(AuthContext);
    const {
        values,
        setValues,
        handleInputChange,
        inputErrors,
        validate,
    } = useForm({
        initialValues: {
            memberId: "",
        },
        validateOnChange: true,
    });

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (validate()) {
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
        } else {
            console.log("not valid inputs");
            console.log("inputErrors.memberId", inputErrors.memberId);
        }
    };

    return (
        <Form action="" onSubmit={submitHandler}>
            <FormControl
                error={!!inputErrors.memberId}
                margin="normal"
                fullWidth
            >
                <InputLabel id="name-member">Name</InputLabel>
                <Select
                    labelId="name-member"
                    id="name"
                    label="Name"
                    variant="outlined"
                    name="memberId"
                    value={values.memberId}
                    type="memberId"
                    onChange={handleInputChange}
                >
                    {pet.family &&
                        pet.family.map((member) => {
                            return (
                                <MenuItem key={member._id} value={member._id}>
                                    {member.name}
                                </MenuItem>
                            );
                        })}
                </Select>{" "}
                {inputErrors.memberId && (
                    <FormHelperText>{inputErrors.memberId}</FormHelperText>
                )}
            </FormControl>

            <Button type="submit" variant="contained" color="secondary">
                Remove Family Member
            </Button>
        </Form>
    );
};

export default RemoveFamilyMember;
