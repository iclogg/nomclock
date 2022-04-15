import React, { useState } from "react";

import { Grid, Box } from "@mui/material";

import inputValidator from "./validators";

export const useForm = ({ initialValues, validateOnChange = false }) => {
    const [values, setValues] = useState(initialValues);
    const [inputErrors, setInputErrors] = useState({});

    const validate = (fieldValues = values) => {
        // Copy current inputError state
        let temp = { ...inputErrors };

        // Loop over current fieldvalues update temp error obj accordingly with the inputvalidator
        for (const key in fieldValues) {
            if (key in fieldValues) {
                temp[key] = inputValidator(key, fieldValues[key]);
            }
        }

        // Update the current inputErrors state
        setInputErrors({ ...temp });

        // Return true or false by checking all errors are empty strings or not
        return Object.values(temp).every((x) => x == "");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Set new value state
        setValues({ ...values, [name]: value });

        // Set error status if needed
        if (validateOnChange) {
            validate({ [name]: value });
        }
    };

    return {
        values,
        setValues,
        inputErrors,
        setInputErrors,
        handleInputChange,
        validate,
    };
};

export const Form = (props) => {
    const { children, ...other } = props;
    return (
        <Box
            m={3}
            display="flex"
            justifyContent="center"
            /*             sx={{ backgroundColor: "lightgreen" }}
             */
        >
            <form
                {...other}
                /* TODO: uncomment this when not needed for smother login when developing: autoComplete="off" */
                style={{
                    maxWidth: "800px",
                    /*     backgroundColor: "red", */
                    flexGrow: 1,
                }}
            >
                <Grid container justifyContent="flex-end">
                    {React.Children.map(children, (child) => {
                        console.log("child", child);

                        /*      if (child.type.render.name === "Typography") {
                            return (
                                <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                    sx={{
                                        alignContent: "stretch",
                                    }}
                                >
                                    {React.cloneElement(child, {
                                        fullWidth: "true",
                                    })}
                                </Grid>
                            );
                        }
 */
                        // Give the submit button a grid item wrapper and style
                        if (child.props.type === "submit") {
                            return (
                                <Grid item xs={12} sm={4}>
                                    {React.cloneElement(child, {
                                        fullWidth: true,
                                    })}
                                </Grid>
                            );
                        }
                        return child;
                    })}
                </Grid>
            </form>
        </Box>
    );
};
