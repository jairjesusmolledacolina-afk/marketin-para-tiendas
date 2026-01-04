const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['seller','customer'], default: 'customer' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);