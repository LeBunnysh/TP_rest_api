import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  status: String;
  createdAt: Date;
}

const ProjectSchema = new Schema({
//const statusPossible ='planned', 'in-progress', 'completed';

  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'planned' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
