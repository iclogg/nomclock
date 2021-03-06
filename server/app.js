const express = require("express");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

const petRoutes = require("./routes/pet-routes");
const userRoutes = require("./routes/user-routes");
const mealRoutes = require("./routes/meal-routes");
const HttpError = require("./models/http-error");

const app = express();

// Middleware
app.use(express.json());

// Sanatize
app.use(mongoSanitize());

// CORS
app.use(function (req, res, next) {
    console.log("req.url:", req.url, "method:", req.method);

    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

// Routes
app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);

// Catch all middleware
app.use((req, res, next) => {
    const error = new HttpError("Page not found.", 404);
    throw error;
});

// Error handling
/* TODO decide if use package for error handling. perhaps connect-flash */

app.use((error, req, res, next) => {
    console.log("in app error handler");

    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || "An unknow error happened." });
});

// Set port and start server, connect to database
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => {
        app.listen(port, () => {
            console.log(`Serving on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("error db connection:", err);
    });
