const HttpError = require("../models/http-error");

/* TODO remove dummy user once backen is up */

let USERS = [
    {
        id: "u1",
        name: "Julismund",
        email: "julismund@notanemail.com",
        pets: ["pet1"],
    },
    {
        name: "Mundus",
        email: "mundus@notanemail.com",
        pets: ["pet2"],
    },
];

let idCount = 2;

// TODO add package (or use mongodb? to create unique ids) uuid v4 perhaps?

/* READ */

const getUserById = (req, res, next) => {
    const userId = req.params.userId;
    const user = USER.find((u) => u.id === userId);

    if (!user) {
        return next(new HttpError("No user found.", 404));
    }

    res.status(200).json(user);
};

/* CREATE */

const createUser = (req, res, next) => {
    idCount += 1;
    const { name, email } = req.body;

    const createdUser = {
        id: idCount,
        name,
        email,
    };

    USERS.push(createdUser);
    res.status(201).json(createUser);
};

const deleteUser = (req, res, next) => {
    userId = req.params.userId;
};

exports.getUserById = getUserById;
exports.createUser = createUser;
