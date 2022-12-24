import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product.dto';
import { IProduct } from '../interfaces/product.interface';
import { Inject } from '@nestjs/common';

export class ProductRepo {
  constructor(@Inject('Product') private productModel: Model<IProduct>) {}

  addProduct = async (productData: ProductDTO): Promise<ProductDTO> => {
    return await new this.productModel(productData).save();
  };
}
