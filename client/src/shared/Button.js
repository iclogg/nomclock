import React from "react";
import { Link } from "react-router-dom";

export const Button = (props) => {
    if (props.href) {
        return <a href={props.href}>{props.children}</a>;
    }
    if (props.to) {
        return (
            <Link to={props.to} exact={props.exact}>
                {props.children}
            </Link>
        );
    }
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};
