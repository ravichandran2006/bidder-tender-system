const mongoose = require('mongoose');

const tenderUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  proofFile: String,
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('TenderUser', tenderUserSchema);

