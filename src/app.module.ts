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
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ProductRepo } from './repository/product.repository';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './utils/auth.constant';
import { JwtStrategy } from './middleware/auth.passport';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { WarrantyProviders } from './providers/warranty.provider';
import { WarrantyRepo } from './repository/warrantyClaim.repository';
import { WarrantyClaimService } from './services/warrantyClaim.service';
import { WarrantyController } from './controllers/warrantyClaim.controller';

@Module({
  imports: [
    MulterModule.register({
      dest: join(__dirname, '/upload'),
    }),
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: String(jwtConstants.secret),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    FileUpload,
    AuthController,
    FileUpload,
    ProductController,
    UserController,
    WarrantyController,
  ],
  providers: [
    AppService,
    UserProviders,
    ProductProviders,
    WarrantyProviders,
    UserRepo,
    AuthService,
    UserService,
    ProductRepo,
    ProductService,
    JwtStrategy,
    WarrantyRepo,
    WarrantyClaimService,
  ],
})
export class AppModule {}
