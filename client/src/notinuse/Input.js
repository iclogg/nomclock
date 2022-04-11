import React, { useReducer, useEffect } from "react";

import { validate } from "../utils/validators";

//reducer

const inputReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            };
        default:
            return state;
    }
};

//component

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || "",
        isValid: props.initialValid || false,
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid);
    }, [id, value, isValid, onInput]);

    const changeHandler = (e) => {
        dispatch({
            type: "CHANGE",
            val: e.target.value,
            validators: props.validators,
        });
    };

    const element =
        props.element === "input" ? (
            <input
                id={props.id}
                type={props.type}
                onChange={changeHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={props.id}
                rows={props.rows || 3}
                onChange={changeHandler}
                value={inputState.value}
            />
        );

    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default Input;
