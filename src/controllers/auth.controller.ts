import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserDTOLogin, UserDTORegister, UserDTO } from '../dto/user.dto';
import { ResponseData } from '../dto/response.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { JwtAuthGuard } from '../utils/jwt.guard';

@Controller('/api')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/register')
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
      const customer = await this.authService.getRegister(userData);

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

  @Post('/auth/login')
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
      const customer = await this.authService.getLogin(userData);

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

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @ApiOperation({ summary: 'Customer / Staf get profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Customer / Staf has been login successfully',
    type: UserDTO,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: UserDTO,
  })
  async getProfile(@Req() req: Request | any): Promise<ResponseData> {
    const profile = await this.authService.getProfile(req['user']['email']);

    return {
      status: true,
      message: 'User has been access profile successfully',
      payload: profile,
    };
  }
}
