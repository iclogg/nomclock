const HttpError = require("../models/http-error");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // if no header split can fail and throw an error
        if (!token) {
            throw new Error("Authentication failed");
        }
        const decodedToken = jwt.verify(
            token,
            require("../secrets.json").jwtstr
        );

        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed", 401);
        return next(error);
    }
};
