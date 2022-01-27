import React, { useContext } from "react";

import { Button } from "../shared/Button";

import { AuthContext } from "../utils/auth-context";

const Logout = () => {
    const auth = useContext(AuthContext);
    window.location.replace("/login");
    return <Button onClick={auth.logout}>Logout</Button>;
};

export default Logout;
