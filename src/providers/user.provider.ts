import { Mongoose } from 'mongoose';
import { User } from '../entities/user.entity';

export const UserProviders = {
  provide: 'User',
  useFactory: (mongoose: Mongoose) => mongoose.model('User', User),
  inject: ['DATABASE_CONNECTION'],
};
