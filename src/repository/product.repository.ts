import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product.dto';
import { IProduct } from '../interfaces/product.interface';
import { Inject } from '@nestjs/common';

export class ProductRepo {
  constructor(@Inject('Product') private productModel: Model<IProduct>) {}

  addProduct = async (productData: ProductDTO): Promise<ProductDTO> => {
    return await new this.productModel(productData).save();
  };

  getAllProduct = async (): Promise<ProductDTO[]> => {
    return await this.productModel.find();
  };

  getProductById = async (id: string): Promise<ProductDTO | null> => {
    return await this.productModel.findById(id);
  };

  updateProduct = async (
    id: string,
    productUpdate: ProductDTO,
  ): Promise<ProductDTO | null> => {
    await this.productModel.findByIdAndUpdate(id, productUpdate);

    return await this.getProductById(id);
  };

  deleteProduct = async (id: string): Promise<ProductDTO | null> => {
    return await this.productModel.findByIdAndRemove(id);
  };
}
