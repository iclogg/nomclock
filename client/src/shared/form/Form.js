import { useState } from "react";

export const useForm = ({
    initialValues,
    validateOnChange = false,
    validate,
}) => {
    const [values, setValues] = useState(initialValues);
    const [inputErrors, setInputErrors] = useState({});

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
