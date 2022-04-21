import { TextField, Button, Paper, Grid } from "@mui/material";
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
        <Paper
            elevation={8}
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.75)",
            }}
        >
            <Form onSubmit={submitHandler}>
                <TextInput
                    label="Comment"
                    color="secondary"
                    variant="outlined"
                    name="comment"
                    value={values.comment}
                    onChange={handleInputChange}
                />
                <Grid item xs={12}>
                    <TimePicker
                        ampm={false}
                        label="Meal Time"
                        value={values.time}
                        name="time"
                        onChange={(newValue) => {
                            setValues({ ...values, time: newValue });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                sx={{ marginBottom: "10px" }}
                            />
                        )}
                    />
                </Grid>

                <Button variant="contained" color="secondary" type="submit">
                    Add Meal
                </Button>
            </Form>
        </Paper>
    );
};

export default NewMeal;
