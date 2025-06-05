const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  subscription: { type: String },
  company: { type: String },
  token: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "user" }, 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
