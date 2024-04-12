const mongoose = require("mongoose");

function ConnectionToMongoose() {
    mongoose
        .connect("mongodb://localhost:27017/user-info", {
             useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connection done......!!!!!"))
        .catch((err) => console.error("Connection error:", err));
}

module.exports = ConnectionToMongoose;
