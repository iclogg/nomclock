const inputValidator = (str, value) => {
    if ("email" === str) {
        return /(.+)@(.+){1,}\.(.+){2,}/.test(value)
            ? ""
            : "Please enter a valid email.";
    }
    if ("password" === str) {
        return value.length > 5
            ? ""
            : "A password has minimum of 6 characters.";
    }

    if ("name" === str) {
        return value.length > 0
            ? ""
            : "A password has minimum of 6 characters.";
    }
};

export default inputValidator;
