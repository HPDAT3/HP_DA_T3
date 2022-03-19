const mongoose = require("mongoose");
const ParaSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  sentiment: {
    type: String,
    required: false,
  },
  
});
const FormSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  cik: {
    type: String,
    required: true,
  },
  formType: {
    type: String,
    required: true,
  },
  paras: [ParaSchema],
});

module.exports = mongoose.model("Forms", FormSchema, "Forms");
