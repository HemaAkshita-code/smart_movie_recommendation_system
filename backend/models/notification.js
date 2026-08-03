const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserLogin', required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['new_review', 'watchlist_update', 'general'], 
    default: 'general' 
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);