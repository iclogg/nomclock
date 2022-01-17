const express = require("express");
const { check } = require("express-validator");

const {
    login,
    createUser,
    deleteUser,
    updateUserDetails,
} = require("../controllers/user-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
    "/",
    [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
    createUser
);

router.get("/login", login);

router.use(checkAuth);

router.delete("/:userId", deleteUser);

router.patch(
    "/:userId",
    [check("name").not().isEmpty(), check("email").normalizeEmail().isEmail()],
    updateUserDetails
);

module.exports = router;
