import { Status } from '../utils/enum';
import * as mongoose from 'mongoose';

export const WarrantyClaim = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  warrantyNumber: {
    type: Number,
    required: true,
  },
  isStatus: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },

  details: [],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const WarrantyClaimSchema = mongoose.model(
  'WarrantyClaim',
  WarrantyClaim,
);
