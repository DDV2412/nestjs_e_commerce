import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';
import { SecurityType } from 'src/utils/enum';
import { JwtAuthGuard } from 'src/utils/jwt.guard';
import { Roles } from 'src/utils/roles.decorator';
import { RolesGuard } from 'src/utils/roles.guard';
import { ResponseData } from '../dto/response.dto';

@Controller('/api/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'User has been created successfully',
    type: UserDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'User with name not created!',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async addUser(@Body() userData: UserDTO): Promise<ResponseData> {
    try {
      const product = await this.userService.addUser(userData);

      return {
        status: true,
        message: 'User has been created successfully',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `User with ${userData.name} not created!`,
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
  @ApiOperation({ summary: 'User product by ID' })
  @ApiResponse({
    status: 200,
    description: 'User has been updated successfully',
    type: UserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'User with id not found!',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDTO,
  ): Promise<ResponseData> {
    try {
      const product = await this.userService.updateUser(id, userData);

      if (!product) {
        return {
          status: false,
          message: `User with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'User has been updated successfully',
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
    description: 'User has been deleted successfully',
    type: UserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'User with id not found!',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async deleteUser(@Param('id') id: string): Promise<ResponseData> {
    try {
      await this.userService.deleteUser(id);

      return {
        status: true,
        message: 'User has been deleted successfully',
        payload: null,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `User with ${id} not deleted!`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Roles(SecurityType.STAF)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get user by ID',
    type: UserDTO,
  })
  @ApiResponse({
    status: 404,
    description: 'User with id not found!',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async getUserById(@Param('id') id: string): Promise<ResponseData> {
    try {
      const product = await this.userService.getUserById(id);

      if (!product) {
        return {
          status: false,
          message: `User with ${id} not found!`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Successfully get user by ID',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `User with ${id} not found`,
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
  @ApiOperation({ summary: 'Get list users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully get all users',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async getAllUser(): Promise<ResponseData> {
    try {
      const product = await this.userService.getAllUser();

      return {
        status: true,
        message: 'Successfully get all users',
        payload: product,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `User is empty record`,
          payload: [],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
