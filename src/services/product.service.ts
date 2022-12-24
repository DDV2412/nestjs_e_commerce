import { Injectable } from '@nestjs/common';
import { ProductRepo } from '../repository/product.repository';
import { ProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}
  addProduct = async (productData: ProductDTO): Promise<ProductDTO> => {
    return await this.productRepo.addProduct(productData);
  };

  getAllProduct = async (): Promise<ProductDTO[]> => {
    return await this.productRepo.getAllProduct();
  };

  getProductById = async (id: string): Promise<ProductDTO | null> => {
    return await this.productRepo.getProductById(id);
  };

  updateProduct = async (
    id: string,
    productUpdate: ProductDTO,
  ): Promise<ProductDTO | null> => {
    const product = await this.getProductById(id);

    if (!product) {
      return null;
    }

    return await this.productRepo.updateProduct(id, productUpdate);
  };

  deleteProduct = async (id: string): Promise<ProductDTO | null> => {
    const product = await this.getProductById(id);

    if (!product) {
      return null;
    }
    return await this.productRepo.deleteProduct(id);
  };
}
