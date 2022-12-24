import { Document } from 'mongoose';
import { IProduct } from './product.interface';
import { IUser } from './user.interface';
import { Status } from '../utils/enum';

export interface IWarranty extends Document {
  readonly product: IProduct;
  readonly customer: IUser;
  readonly warrantyNumber: number;
  readonly isStatus: Status;
  readonly details: [];
}
