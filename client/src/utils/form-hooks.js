import { useCallback, useReducer } from "react";

export const formReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            let formIsValid = true;
            let formIsValidCount = 1;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;

                    formIsValidCount += 1;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;

                    formIsValidCount += 1;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        isValid: action.isValid,
                    },
                },
                isValid: formIsValid,
            };
        default:
            return state;
    }
};
