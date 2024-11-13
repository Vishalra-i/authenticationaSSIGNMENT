import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  actionType: string;
  userId: mongoose.Types.ObjectId | string;  
  role: string;
  additionalData?: Record<string, unknown>;
  timestamp: Date;
  isDeleted: boolean;
}

const LogSchema: Schema = new Schema({
  actionType: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  additionalData: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

export default mongoose.model<ILog>('Log', LogSchema);
