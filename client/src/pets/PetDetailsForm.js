import { Button } from "@mui/material";

import { Form } from "../shared/form/Form";
import TextInput from "../shared/form/TextInput";

const PetDetailsForm = ({ submitHandler, values, handleInputChange }) => {
    return (
        <Form action="" onSubmit={submitHandler}>
            <TextInput
                label="Name"
                name="name"
                /*errorText="Please enter a valid title."
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
                /*errorText="Please enter a description (at least 5 characters)"
                 */
                value={values.description}
                onChange={handleInputChange}
            />
            <Button type="submit" color="secondary" variant="contained">
                SAVE
            </Button>
        </Form>
    );
};

export default PetDetailsForm;
