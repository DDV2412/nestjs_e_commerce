import { Mongoose } from 'mongoose';
import { Product } from '../entities/product.entity';

export const ProductProviders = {
  provide: 'Product',
  useFactory: (mongoose: Mongoose) => mongoose.model('Product', Product),
  inject: ['DATABASE_CONNECTION'],
};
