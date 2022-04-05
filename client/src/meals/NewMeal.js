import { TextField, Button, FormGroup } from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";

import useMeals from "../utils/meal-hooks";
import { useForm, Form } from "../shared/form/Form";
import TextInput from "../shared/form/TextInput";

const NewMeal = ({ mealsUpdateHandler, meals }) => {
    const { addMeal } = useMeals();

    const { values, setValues, handleInputChange } = useForm({
        initialValues: {
            time: null,
            comment: "",
        },
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await addMeal(
                mealsUpdateHandler,
                values.time,
                values.comment,
                meals
            );
            setValues({ time: null, comment: "" });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <FormGroup>
                <TextInput
                    label="Comment"
                    color="secondary"
                    variant="outlined"
                    name="comment"
                    value={values.comment}
                    onChange={handleInputChange}
                />
                <TimePicker
                    ampm={false}
                    label="Meal Time"
                    value={values.time}
                    name="time"
                    onChange={(newValue) => {
                        setValues({ ...values, time: newValue });
                    }}
                    renderInput={(params) => (
                        <TextField {...params} sx={{ margin: "5px" }} />
                    )}
                />
                <Button variant="contained" color="secondary" type="submit">
                    Add Meal
                </Button>
            </FormGroup>
        </Form>
    );
};

export default NewMeal;
