import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: String,
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  projectId: { type: String, ref: 'Project' },
  creationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['todo', 'doing', 'done'], required: true },
  ownerId: { type: String, ref: 'User' } 
});

export const StoryModel = mongoose.model('Story', storySchema);