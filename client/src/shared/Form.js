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
    const { children, ...other } = props;
    return <form {...other}>{children}</form>;
};
