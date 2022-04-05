import { useState } from "react";

import inputValidator from "./validators";

export const useForm = ({ initialValues, validateOnChange = false }) => {
    const [values, setValues] = useState(initialValues);
    const [inputErrors, setInputErrors] = useState({});

    const validate = (fieldValues = values) => {
        let temp = { ...inputErrors };

        for (const key in fieldValues) {
            if (key in fieldValues) {
                temp[key] = inputValidator(key, fieldValues[key]);
            }
        }

        setInputErrors({ ...temp });

        return Object.values(temp).every((x) => x == "");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value });

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
            {...other} /* TODO: uncomment this when not needed for testing autoComplete="off" */
        >
            {children}
        </form>
    );
};
