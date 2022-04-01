import { useState } from "react";

export const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return { values, setValues, handleInputChange };
};

export const Form = (props) => {
    const formStyle = { margin: "20px" };

    const { children, ...other } = props;
    return (
        <form style={formStyle} {...other}>
            {children}
        </form>
    );
};
