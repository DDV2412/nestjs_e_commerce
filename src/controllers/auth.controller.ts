import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { UserDTOLogin, UserDTORegister } from '../dto/user.dto';
import { ResponseData } from '../dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@Controller('/api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Customer register' })
  @ApiResponse({
    status: 201,
    description: 'Customer has been created successfully',
    type: UserDTORegister,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTORegister,
  })
  async getRegister(@Body() userData: UserDTORegister): Promise<ResponseData> {
    try {
      const customer = await this.userService.getRegister(userData);

      return {
        status: true,
        message: 'Customer has been created successfully',
        payload: customer,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Customer with ${userData.email} not available or password wrong`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/login')
  @ApiOperation({ summary: 'Customer login' })
  @ApiResponse({
    status: 200,
    description: 'Customer has been login successfully',
    type: UserDTOLogin,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTOLogin,
  })
  async getLogin(@Body() userData: UserDTOLogin): Promise<ResponseData> {
    try {
      const customer = await this.userService.getLogin(userData);

      if (!customer) {
        return {
          status: false,
          message: `Customer with ${userData.email} not available or password wrong`,
          payload: null,
        };
      }

      return {
        status: true,
        message: 'Customer has been login successfully',
        payload: customer,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: false,
          message: `Customer with ${userData.email} not available or password wrong`,
          payload: null,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
