const Node = require("../models/Node");

const createNode = async (req, res) => {
  try {
    const node = await Node.create(req.body);

    res.status(201).json({
      success: true,
      data: node,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllNodes = async (req, res) => {
  try {
    const nodes = await Node.find();

    res.status(200).json({
      success: true,
      data: nodes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createNode,
  getAllNodes,
};