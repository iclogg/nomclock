import React, { useReducer } from "react";

const Input = (props) => {
    useReducer();

    const changeHandler = (e) => {};

    const element =
        props.element === "input" ? (
            <input id={props.id} type={props.type} onChange={changeHandler} />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
            />
        );

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
        </div>
    );
};

export default Input;
