const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['end_user', 'agent', 'admin'], default: 'end_user' },
});

module.exports = mongoose.model('User', UserSchema);