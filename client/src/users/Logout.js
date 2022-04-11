import { useContext } from "react";

import { Tooltip, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { AuthContext } from "../utils/auth-context";

const Logout = () => {
    const auth = useContext(AuthContext);
    return (
        <Tooltip title="Logout">
            <Button color="secondary" size="small" onClick={auth.logout}>
                <LogoutIcon />
            </Button>
        </Tooltip>
    );
};

export default Logout;
