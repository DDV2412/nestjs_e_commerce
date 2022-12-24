import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from 'src/services/user.service';
import { UserDTOLogin, UserDTORegister } from '../dto/user.dto';
import { ResponseData } from '../dto/response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { User } from '../schema/user.schema';

@Controller('/api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Customer register' })
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'Customer has been created successfully',
    type: User,
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
      return {
        status: false,
        message: 'Error: Customer not created!',
        payload: null,
      };
    }
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Customer login' })
  @ApiResponse({
    status: 200,
    description: 'Customer has been login successfully',
    type: User,
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
      return {
        status: false,
        message: `Error: Customer with ${userData.email} not available`,
        payload: null,
      };
    }
  }
}
