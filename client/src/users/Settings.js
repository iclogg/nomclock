import React, { useState, useContext } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import { AuthContext } from "../utils/auth-context";
import useAxios from "../utils/axios-hook";

const ModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Settings = () => {
    const auth = useContext(AuthContext);

    const { sendRequest } = useAxios();

    //Delete Modal
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const deleteUser = async (e) => {
        e.preventDefault();

        try {
            const response = await sendRequest(
                `users/${auth.userId}`,
                "delete",
                {},
                { authorization: `Bearer ${auth.token}` }
            );
            if (response.data.message === "User deleted") {
                console.log("logout");

                auth.logout();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={ModalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Delete NomClock Account
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you want to delete your NomClock account?
                        All pets registered as owned by you will also be
                        deleted.
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={deleteUser}
                    >
                        Delete
                    </Button>
                    <Button color="secondary" onClick={handleClose}>
                        No, I change my mind
                    </Button>
                </Box>
            </Modal>
            <Button color="secondary" onClick={handleOpen}>
                Delete Account
            </Button>
        </Box>
    );
};
export default Settings;
