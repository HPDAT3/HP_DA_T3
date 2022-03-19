const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
  //   name == year
  name: {
    type: String,
    required: true,
  },
  cik: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Table", TableSchema, "Table");
