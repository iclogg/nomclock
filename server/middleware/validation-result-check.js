const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        const error = new HttpError(
            "Invalid inputs passed, please check data",
            422
        );
        return next(error);
    }
    next();
};
