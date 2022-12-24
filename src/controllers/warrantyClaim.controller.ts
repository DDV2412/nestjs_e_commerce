import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
  Get,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { ResponseData } from '../dto/response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../utils/jwt.guard';
import { Roles } from '../utils/roles.decorator';
import { SecurityType, Status } from 'src/utils/enum';
import { RolesGuard } from '../utils/roles.guard';
import { WarrantyDTO } from '../dto/warranty.dto';
import { ErrorDTO } from '../dto/error.dto';
import { ProductService } from '../services/product.service';
import { WarrantyClaimService } from '../services/warrantyClaim.service';
import { AuthService } from '../services/auth.service';

@Controller('/api/warranty/claim')
@ApiTags('Warranty Claim')
export class WarrantyController {
  constructor(
    private readonly WarrantyService: WarrantyClaimService,
    private readonly productService: ProductService,
    private readonly authService: AuthService,
  ) {}

  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new Warranti claim' })
  @ApiResponse({
    status: 201,
    description: 'Warranti claim has been created successfully',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'Warranti claim with Warranti claim name not created!',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDTO,
  })
  async addWarranty(
    @Req() req: Request | any,
    @Param('productId') productId: string,
    @Body() warrantyData: WarrantyDTO,
  ): Promise<ResponseData> {
    try {
      const product = await this.productService.getProductById(productId);

      if (!product) {
        return {
          status: false,
          message: `Product with ${productId} not found!`,
          payload: null,
        };
      }
      const profile = await this.authService.getProfile(req['user']['email']);

      if (!profile) {
        return {
          status: false,
          message: `Please re-login to submit a warranty claim`,
          payload: null,
        };
      }
      const claim = await this.WarrantyService.addWarranty({
        product: product,
        customer: profile,
        warrantyNumber: warrantyData.warrantyNumber,
        isStatus: Status.PENDING,
        details: warrantyData.details,
      });

      return {
        status: true,
        message: 'Warranti claim has been created successfully',
        payload: claim,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Warranti claim with ${warrantyData.warrantyNumber} not created!`,
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
  @ApiOperation({ summary: 'Update Warranti claim by ID' })
  @ApiResponse({
    status: 200,
    description: 'Warranti claim has been updated successfully',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Warranti claim with id not found!',
    type: ErrorDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDTO,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() isStatus: Status,
  ): Promise<ResponseData> {
    try {
      console.log(isStatus);

      const claim = await this.WarrantyService.updateStatus(id, isStatus);

      if (!claim) {
        return {
          status: false,
          message: `Warranti claim with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Warranti claim has been updated successfully',
        payload: claim,
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

  @Get(':id')
  @ApiOperation({ summary: 'Get Warranti claim by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get Warranti claim by ID',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'Warranti claim with id not found!',
    type: ErrorDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDTO,
  })
  async getWarrantyById(@Param('id') id: string): Promise<ResponseData> {
    try {
      const claim = await this.WarrantyService.getWarrantyById(id);

      if (!claim) {
        return {
          status: false,
          message: `Warranti claim with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Successfully get Warranti claim by ID',
        payload: claim,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Warranti claim with ${id} not found`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list Warranti claims' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all Warranti claims',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: ErrorDTO,
  })
  async getAllWarranty(): Promise<ResponseData> {
    try {
      const claim = await this.WarrantyService.getAllWarranty();

      return {
        status: true,
        message: 'Successfully get all Warranti claims',
        payload: claim,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Warranti claim is empty record`,
          payload: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
