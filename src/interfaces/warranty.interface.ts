import { Document } from 'mongoose';
import { IUser } from './user.interface';
import { Status } from '../utils/enum';
import { ProductDTO } from 'src/dto/product.dto';

export interface IWarranty extends Document {
  readonly product: ProductDTO;
  readonly customer: IUser;
  readonly warrantyNumber: number;
  readonly isStatus: Status;
  readonly details: [];
}
