import { useState } from "react";

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

        // Set new value
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
    const formStyle = { margin: "20px" };

    const { children, ...other } = props;
    return (
        <form
            style={formStyle}
            {...other}
            /* TODO: uncomment this when not needed for smother login when developing: autoComplete="off" */
        >
            {children}
        </form>
    );
};
