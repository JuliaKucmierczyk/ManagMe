import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true},
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  storyId: String,
  state: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  createdAt: { type: Date, default: Date.now },
  estimatedTime: Number,
  startDate: Date,
  endDate: Date,
  userId: { type: String, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);