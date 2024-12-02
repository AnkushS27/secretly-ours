import mongoose, { Document, Schema } from 'mongoose';

export interface Secret extends Document {
  content: string;
  user: mongoose.Types.ObjectId; // Reference to the User model
}

const SecretSchema: Schema<Secret> = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'User is required'],
    },
  },
  { timestamps: true }
);

// Ensure to use the Secret model from mongoose
const SecretModel =
  (mongoose.models.Secret as mongoose.Model<Secret>) ||
  mongoose.model<Secret>('Secret', SecretSchema);

export default SecretModel;
