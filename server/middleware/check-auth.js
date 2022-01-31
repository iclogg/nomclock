const HttpError = require("../models/http-error");

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    //TODO see if I can remove this due to similar in app.js
    console.log("check auth");

    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // if no header split can fail and throw an error
        if (!token) {
            throw new Error("Authentication failed");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);

        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError("Authentication failed", 403);
        return next(error);
    }
};
