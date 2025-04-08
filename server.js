require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 4200;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "hbs");

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// User model
const User = require("./models/User");

// Routes
app.get("/", (req, res) => res.render("index"));

app.post("/submit", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.render("success", { user, message: "User added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving user");
    }
});

app.get("/display", async (req, res) => {
    try {
        const users = await User.find().lean();
        res.render("display", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});


app.get("/edit/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        res.render("edit", { user });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching user");
    }
});


app.post("/edit/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/display");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
});

app.post("/delete/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect("/display");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//this project will be added in resume as well be hosted on github.
//DEscription:-
//in this a user can enter his/her deatils and can save the record in database.
//this project is created via both frontend and backend technologies its a full stack project whre html n css are used for frontend.
//mongoose library is used as frontend of mongodb
//we are using handlebars(hbs) as templating engine for server side rendering and making the code look cleaner
//and express js ,mongo db(as database) are used for backend part.
//also mongodb compass is a crucial part of this project