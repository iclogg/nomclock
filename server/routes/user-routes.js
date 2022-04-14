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

/* No-Auth routes: */
router.post(
    "/",
    [
        check("name").not().isEmpty().trim().escape(),
        check("email").normalizeEmail().isEmail().trim().escape(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    createUser
);

router.post(
    "/login",
    [
        check("email").normalizeEmail().isEmail().trim().escape(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    login
);

/* Auth routes: */

router.get("/:userId/families", checkAuth, getUserFamilies);

router.delete("/:userId", checkAuth, deleteUser);

router.patch(
    "/:userId",
    checkAuth,
    [
        check("name").not().isEmpty(),
        check("email").normalizeEmail().isEmail(),
        check("password").isLength({ min: 6 }).trim().escape(),
    ],
    updateUserDetails
);

module.exports = router;
