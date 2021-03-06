const inputValidator = (str, value) => {
    if ("email" === str) {
        return /(.+)@(.+){1,}\.(.+){2,}/.test(value.trim())
            ? ""
            : "Please enter a valid email.";
    }
    if ("password" === str) {
        return value.trim().length > 5
            ? ""
            : "A password has minimum of 6 characters.";
    }

    if ("name" === str) {
        return value.trim().length > 0 ? "" : "Please enter your name.";
    }
    if ("description" === str) {
        return value.trim().length > 3
            ? ""
            : "Please enter at least 4 characters.";
    }
    if ("maxMeals" === str) {
        return value > 0 ? "" : "Please enter a max amount of meals";
    }

    if ("memberId" === str) {
        return value.length > 0 ? "" : "Who is no longer part of the family?";
    }
};

export default inputValidator;
