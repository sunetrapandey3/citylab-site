const Test = require("../models/testModel");

exports.getTests = async (req, res) => {
  try {
    const { category } = req.query;
    const [rows] = await Test.getAllTests(category);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};

exports.getTestById = async (req, res) => {
  try {
    const [rows] = await Test.getTestById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ error: "Test not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch test" });
  }
};
