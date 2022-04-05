const inputValidator = (str, value) => {
    if ("email" === str) {
        return /(.+)@(.+){2,}\.(.+){2,}/.test(value)
            ? ""
            : "Please enter a valid email.";
    }
    if ("password" === str) {
        return value.length > 5
            ? ""
            : "A password has minimum of 6 characters.";
    }
};

export default inputValidator;
