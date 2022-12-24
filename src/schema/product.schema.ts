import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  images: Record<string, string>[];

  @Prop()
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
