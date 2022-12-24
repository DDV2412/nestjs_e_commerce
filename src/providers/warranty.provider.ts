import { Mongoose } from 'mongoose';
import { WarrantyClaim } from '../entities/warrantyClaim.entity';

export const WarrantyProviders = {
  provide: 'WarrantyClaim',
  useFactory: (mongoose: Mongoose) =>
    mongoose.model('WarrantyClaim', WarrantyClaim),
  inject: ['DATABASE_CONNECTION'],
};
