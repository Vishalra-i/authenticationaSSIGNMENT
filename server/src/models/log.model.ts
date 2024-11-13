import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  actionType: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  additionalData: { type: mongoose.Schema.Types.Mixed },
  isDeleted: { type: Boolean, default: false }
});

const Log = mongoose.model('Log', logSchema);

export default Log;
