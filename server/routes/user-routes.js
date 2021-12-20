const express = require("express");

const router = express.Router();

const {
    getUserById,
    createUser,
    deleteUser,
    updateUserDetails,
} = require("../controllers/user-controllers");

router.get("/:userId", getUserById);
router.delete("/:userId", deleteUser);
router.patch("/:userId", updateUserDetails);
router.post("/", createUser);

module.exports = router;
