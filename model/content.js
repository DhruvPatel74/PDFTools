const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const toolSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  formId: String,
  fileInputId: String,
  pageRangeId: String,
  pageRangePlaceholder: String,
  buttonId: String,
  buttonText: String,
  steps: [String],
  features: [featureSchema],
  pageRangeRequired: Boolean,
});

module.exports = mongoose.model("Content", toolSchema);
