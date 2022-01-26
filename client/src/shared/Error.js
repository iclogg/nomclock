import React from "react";

import Overlay from "./Overlay";
import { Button } from "./Button";

const Error = (props) => {
    return (
        <Overlay className="overlay">
            <h1>{props.message}</h1>
            <Button onClick={props.onClick}>X</Button>
        </Overlay>
    );
};

export default Error;
