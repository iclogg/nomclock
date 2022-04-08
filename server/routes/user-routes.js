const express = require("express");
const { check } = require("express-validator");

const {
    login,
    getUserFamilies,
    createUser,
    deleteUser,
    updateUserDetails,
} = require("../controllers/user-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post(
    "/",
    [
        check("name").not().isEmpty().trim().escape(),
        check("email").normalizeEmail().isEmail().trim().escape(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    createUser
);

router.get("/:userId/families", getUserFamilies);

router.post(
    "/login",
    [
        check("email").normalizeEmail().isEmail().trim().escape(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    login
);

router.use(checkAuth);

router.delete("/:userId", deleteUser);

router.patch(
    "/:userId",
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    updateUserDetails
);

module.exports = router;
