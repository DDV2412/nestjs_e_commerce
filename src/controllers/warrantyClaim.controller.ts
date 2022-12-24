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
} from '@nestjs/common';
import { ResponseData } from '../dto/response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import { Roles } from 'src/utils/roles.decorator';
import { SecurityType, Status } from 'src/utils/enum';
import { RolesGuard } from 'src/utils/roles.guard';
import { WarrantySevice } from '../services/warrantyClaim.service';
import { WarrantyDTO } from '../dto/warranty.dto';

@Controller('/api/warranty/claim')
@ApiTags('Warranty Claim')
export class WarrantyController {
  constructor(private readonly WarrantyService: WarrantySevice) {}

  @Roles(SecurityType.CUSTOMER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
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
    type: WarrantyDTO,
  })
  async addWarranty(@Body() warrantyData: WarrantyDTO): Promise<ResponseData> {
    try {
      const claim = await this.WarrantyService.addWarranty(warrantyData);

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
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: WarrantyDTO,
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() status: Status,
  ): Promise<ResponseData> {
    try {
      const claim = await this.WarrantyService.updateStatus(id, status);

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
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: WarrantyDTO,
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
  @ApiOperation({ summary: 'Get list Warranti claims' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all Warranti claims',
    type: WarrantyDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: WarrantyDTO,
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
