const Data = require("../models/Data");

const getAllData = async (req, res) => {
  try {
    const data = await Data.find();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createData = async (req, res) => {
  try {
    const data = await Data.create(req.body);

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔥 IMPORTANT EXPORT
module.exports = {
  getAllData,
  createData,
};