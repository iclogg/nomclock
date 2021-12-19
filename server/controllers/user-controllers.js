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
// TODO Add login logic based on email and password. consider password library passport (local mongoose).
// TODO Reconsider naming routes login and logout instead
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

/* DELETE */
const deleteUser = (req, res, next) => {
    userId = req.params.userId;
    USERS = USERS.filter((u) => u.id !== userId);
    res.status(200).json();
};

/* UPDATE */
const updateUserDetails = (req, res, next) => {
    const userId = req.params.userId;
    const { name, email } = req.body;

    const updatedUser = { ...USERS.find((user) => user.id === userId) };
    const index = USERS.findIndex((user) => user.id === userId);

    updatedUser.name = name;
    updatedUser.email = email;

    USERS[index] = updatedUser;

    res.status(200).json({ user: updatedUser });
};

exports.getUserById = getUserById;
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.updateUserDetails = updateUserDetails;
