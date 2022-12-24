import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiTags } from '@nestjs/swagger/dist';

@Controller()
@ApiTags('Home Page')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
