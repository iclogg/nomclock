import { Button, FormGroup } from "@mui/material";

import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";
import { useForm, Form } from "../shared/form/Form";

import TextInput from "../shared/form/TextInput";

const NewFamilyMember = ({ setPet, toggleSetIsUpdating }) => {
    const auth = useContext(AuthContext);

    const { values, setValues, handleInputChange } = useForm({
        email: "",
    });

    const { petId } = useParams();

    const { sendRequest } = useAxios();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `pets/${petId}/family`,
                "post",
                {
                    email: values.email,
                },
                { authorization: `Bearer ${auth.token}` }
            );

            setValues({
                email: "",
            });
            setPet(response.data.pet);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form action="" onSubmit={submitHandler}>
            <FormGroup>
                <TextInput
                    name="email"
                    label="Email"
                    color="secondary"
                    variant="outlined"
                    value={values.email}
                    onChange={handleInputChange}
                    type="email"
                />
            </FormGroup>
            <Button type="submit" variant="contained" color="secondary">
                Add Family Member
            </Button>
        </Form>
    );
};

export default NewFamilyMember;
