const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  forms: [{ type: String }],
  formName: [{type: String}],
});

module.exports = mongoose.model("Company", CompanySchema, "Company");

