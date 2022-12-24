import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { User } from './user.schema';
import { Status } from '../utils/enum';

@Schema()
export class WarrantyClaim {
  @Prop()
  product: Product;

  @Prop()
  customer: User;

  @Prop()
  warrantyNumber: number;

  @Prop()
  isStatus: Status;

  @Prop()
  details: Record<string, string>[];
}

export const WarrantyClaimSchema = SchemaFactory.createForClass(WarrantyClaim);
