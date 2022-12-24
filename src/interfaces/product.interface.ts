import { Document } from 'mongoose';

export interface IProduct extends Document {
  readonly name: string;

  readonly description: string;

  readonly price: number;

  readonly images: {
    filename: string;
    path: string;
  }[];

  readonly stock: number;
}
