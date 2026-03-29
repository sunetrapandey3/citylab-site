const db = require("../config/db");

exports.getAllTests = (category) => {
  if (category && category !== "all") {
    return db.promise().query(
      "SELECT * FROM tests WHERE category = ? ORDER BY category, name",
      [category]
    );
  }
  return db.promise().query("SELECT * FROM tests ORDER BY category, name");
};

exports.getTestById = (id) => {
  return db.promise().query("SELECT * FROM tests WHERE id = ?", [id]);
};
