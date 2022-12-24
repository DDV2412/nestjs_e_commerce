import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ResponseData } from '../dto/response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { ProductService } from '../services/product.service';
import { ProductDTO } from 'src/dto/product.dto';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import { Roles } from 'src/utils/roles.decorator';
import { SecurityType } from 'src/utils/enum';
import { RolesGuard } from 'src/utils/roles.guard';

@Controller('/api/product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new product' })
  @ApiResponse({
    status: 201,
    description: 'Product has been created successfully',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Product with product name not created!',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ProductDTO,
  })
  async addProduct(@Body() productData: ProductDTO): Promise<ResponseData> {
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

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product has been updated successfully',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product with id not found!',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ProductDTO,
  })
  async updateProduct(
    @Param('id') id: string,
    @Body() productData: ProductDTO,
  ): Promise<ResponseData> {
    try {
      const product = await this.productService.updateProduct(id, productData);

      if (!product) {
        return {
          status: false,
          message: `Product with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Product has been updated successfully',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: err.message,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product has been deleted successfully',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product with id not found!',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ProductDTO,
  })
  async deleteProduct(@Param('id') id: string): Promise<ResponseData> {
    try {
      await this.productService.deleteProduct(id);

      return {
        status: true,
        message: 'Product has been deleted successfully',
        payload: null,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Product with ${id} not deleted!`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get product by ID',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Product with id not found!',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ProductDTO,
  })
  async getProductById(@Param('id') id: string): Promise<ResponseData> {
    try {
      const product = await this.productService.getProductById(id);

      if (!product) {
        return {
          status: false,
          message: `Product with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Successfully get product by ID',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Product with ${id} not found`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get list products' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all products',
    type: ProductDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ProductDTO,
  })
  async getAllProduct(): Promise<ResponseData> {
    try {
      const product = await this.productService.getAllProduct();

      return {
        status: true,
        message: 'Successfully get all products',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Product is empty record`,
          payload: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
