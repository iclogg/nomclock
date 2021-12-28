const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const {
    login,
    createUser,
    deleteUser,
    updateUserDetails,
} = require("../controllers/user-controllers");

router.get("/login", login);
router.delete("/:userId", deleteUser);
router.patch(
    "/:userId",
    [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
    updateUserDetails
);

router.post(
    "/",
    [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
    createUser
);

module.exports = router;
