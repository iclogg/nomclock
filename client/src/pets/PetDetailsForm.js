import { Button } from "@mui/material";

import { Form } from "../shared/form/Form";
import TextInput from "../shared/form/TextInput";

const PetDetailsForm = (props) => {
    const {
        submitHandler,
        values,
        handleInputChange,
        inputErrors,
        children,
        saveBtnStatus = false,
    } = props;

    return (
        <Form action="" onSubmit={submitHandler}>
            {children}
            <TextInput
                label="The Darlings name goes here."
                name="name"
                value={values.name}
                onChange={handleInputChange}
                error={inputErrors.name}
                sx={{ minWidth: "250px" }}
            />
            <TextInput
                type="number"
                label="How many meals per day?"
                name="maxMeals"
                onChange={handleInputChange}
                value={values.maxMeals}
                error={inputErrors.maxMeals}
                inputProps={{ min: 1 }}
            />
            <TextInput
                label="Tell us about the Darling."
                name="description"
                value={values.description}
                onChange={handleInputChange}
                error={inputErrors.description}
                sx={{ minWidth: "300px" }}
            />
            <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={!!saveBtnStatus}
            >
                SAVE
            </Button>
        </Form>
    );
};

export default PetDetailsForm;
