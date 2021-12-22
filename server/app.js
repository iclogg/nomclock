const express = require("express");
const mongoose = require("mongoose");

const petRoutes = require("./routes/pet-routes");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);

//Catch all middleware
app.use((req, res, next) => {
    const error = new HttpError("Page not found.", 404);
    throw error;
});

// Error handling
/* TODO decide if use package for error handling. perhaps connect-flash */

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || "An unknow error happened." });
});

// set port and start server, connect to database
const port = process.env.PORT || 5000;

mongoose
    .connect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Serving on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("error db connection:", err);
    });
