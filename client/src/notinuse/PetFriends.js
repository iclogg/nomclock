import { useEffect, useState, useContext } from "react";

import Typography from "@mui/material/Typography";

import PetsList from "../pets/PetsList";

const PetFriends = ({ petFriends }) => {
    return (
        <>
            {petFriends.length ? (
                <Typography variant="h5" mt={3}>
                    Your Extended Family
                </Typography>
            ) : (
                ""
            )}

            {petFriends.length && !isLoading ? (
                <PetsList items={petFriends}></PetsList>
            ) : (
                ""
            )}
        </>
    );
};

export default PetFriends;
