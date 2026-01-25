const db = require("../config/db");

exports.createUser = (name,email,hashedPass) => {
    return db.promise().query(
        "INSERT INTO users (name,email,password) VALUES (?,?,?)",
        [name,email,hashedPass]
    );
};

exports.findByEmail = (email) => {
    return db.promise().query(
        "SELECT * FROM users WHERE email=?",
        [email]
    );
};
