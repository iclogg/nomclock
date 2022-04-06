import { Button } from "@mui/material";

import { Form } from "../shared/form/Form";
import TextInput from "../shared/form/TextInput";

const PetDetailsForm = ({
    submitHandler,
    values,
    handleInputChange,
    inputErrors,
}) => {
    return (
        <Form action="" onSubmit={submitHandler}>
            <TextInput
                label="The Darlings name goes here."
                name="name"
                /*errorText="Please enter a valid title."
                 */
                value={values.name}
                onChange={handleInputChange}
                error={inputErrors.name}
                sx={{ minWidth: "250px" }}
            />
            <TextInput
                type="number"
                label="How many meals per day?"
                name="maxMeals"
                /* errorText="Please choose how many meals a day your darling should have." */
                onChange={handleInputChange}
                value={values.maxMeals}
                error={inputErrors.maxMeals}
                inputProps={{ min: 1 }}
            />
            <TextInput
                label="Tell us about the Darling."
                name="description"
                /*errorText="Please enter a description (at least 5 characters)"
                 */
                value={values.description}
                onChange={handleInputChange}
                error={inputErrors.description}
                sx={{ minWidth: "300px" }}
            />
            <Button type="submit" color="secondary" variant="contained">
                SAVE
            </Button>
        </Form>
    );
};

export default PetDetailsForm;
