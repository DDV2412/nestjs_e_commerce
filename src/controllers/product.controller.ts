import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseData } from '../dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ProductService } from '../services/product.service';
import { ProductDTO } from 'src/dto/product.dto';

@Controller('/api/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Customer register' })
  @ApiResponse({
    status: 201,
    description: 'Customer has been created successfully',
    type: ProductDTO,
  })
  async getRegister(@Body() productData: ProductDTO): Promise<ResponseData> {
    try {
      const product = await this.productService.addProduct(productData);

      return {
        status: true,
        message: 'Product has been created successfully',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Product with ${productData.name} not created!`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
