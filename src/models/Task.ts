import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  done: boolean;
  dueDate?: Date;
}

const TaskSchema = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  dueDate: { type: Date },
});

export default mongoose.model<ITask>('Task', TaskSchema);
