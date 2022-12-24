import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { FileUpload } from './controllers/media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { UserProviders } from './providers/user.provider';
import { ProductProviders } from './providers/product.provider';
import { UserRepo } from './repository/user.repository';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { ProductRepo } from './repository/product.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '/upload'),
    }),
    DatabaseModule,
  ],
  controllers: [
    AppController,
    FileUpload,
    AuthController,
    FileUpload,
    ProductController,
  ],
  providers: [
    AppService,
    UserProviders,
    ProductProviders,
    UserRepo,
    UserService,
    ProductRepo,
    ProductService,
  ],
})
export class AppModule {}
