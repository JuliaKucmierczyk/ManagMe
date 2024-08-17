import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  userId: { type: String, ref: 'User', required: true}
});

export const ProjectModel = mongoose.model('Project', projectSchema);