import { Injectable } from '@nestjs/common';
import { ProductRepo } from '../repository/product.repository';
import { ProductDTO } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepo) {}
  addProduct = async (productData: ProductDTO): Promise<ProductDTO> => {
    return await this.productRepo.addProduct(productData);
  };
}
