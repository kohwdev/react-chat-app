const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must type name"],
    unique: true,
  },
  token: {
    type: String,
  },
  //Feature to add later, online status
  online: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
