const express = require("express");
const mongoose = require("mongoose");

const petRoutes = require("./routes/pet-routes");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./models/http-error");

const app = express();

// Middleware
app.use(express.json());

//CORS FIX
//TODO read up on this CORS Error Axios Request fix. Check for alternatives and what is secure
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    if (req.method == "OPTIONS") {
        res.status(200);
        res.send();
        return;
    }
    next();
});

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
    console.log("in app error handler");

    if (res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || "An unknow error happened." });
});

// set port and start server, connect to database
const port = process.env.PORT || 5000;

mongoose
    .connect(require("./secrets.json").mogostr)
    .then(() => {
        app.listen(port, () => {
            console.log(`Serving on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("error db connection:", err);
    });
